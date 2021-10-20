const reviewProvider = require('../../app/Review/reviewProvider');
const reviewService = require('../../app/Review/reviewService');
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/**
 * API No. 1
 * API Name : 리뷰 등록 API
 * [POST] /app/review
 */
exports.postReview = async function (req, res) {
  /**
   * Path Variable: userIdx
   * Body: productName, rating, sizeRating, brightnessRating, colorRating, message
   */
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const userIdx = req.params.userIdx;
  const {productName, rating, sizeRating, brightnessRating, colorRating, message, type} = req.body;

  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    // 유저 idx 체크
    const userIdxRow = await reviewProvider.userIdxCheck(userIdx);

    if (userIdxRow.length == 0) {
      return res.send(errResponse(baseResponse.USER_USERID_NOT_EXIST));
    }

    const signUpResponse = await reviewService.registerReview(
        userIdx,
        productName,
        rating,
        sizeRating,
        brightnessRating,
        colorRating,
        message,
        type
    );

    return res.send(signUpResponse);
  }
};

/**
 * API No. 2
 * API Name : 리뷰 조회 - 상품 API
 * [GET] /app/review/:productName
 */
exports.getReviewByProductName = async function (req, res) {

  const productIdx = req.params.productIdx;

  if (!productIdx) return res.send(errResponse(baseResponse.PRODUCT_IDX_EMPTY));

  const reviewByProductName = await reviewProvider.retrieveReview(productIdx);
  return res.send(response(baseResponse.SUCCESS, reviewByProductName));

};

exports.getReviewType = async function (req, res) {
  /**
   * Path Variable: productIdx
   * Query String: type
   */
  const productIdx = req.params.productIdx;
  const reviewType = req.query.name;

  if (reviewType!='D' && reviewType!='S' && reviewType!='P') {
    return res.send(errResponse(baseResponse.REVIEW_TYPE_NOT_EXIST));
  };

  const reviewByType = await reviewProvider.retrieveReviewType(reviewType, productIdx);
  return res.send(response(baseResponse.SUCCESS, reviewByType));
};

exports.getReviewGender = async function (req, res) {
  /**
   * Path Variable: productIdx
   * Query String: gender
   */
  const productIdx = req.params.productIdx;
  const reviewGenderType = req.query.class;

  if (reviewGenderType!='M' && reviewGenderType!='W') {
    return res.send(errResponse(baseResponse.REVIEW_GENDERTYPE_NOT_EXIST));
  };

  const reviewByGenderType = await reviewProvider.retrieveReviewGenderType(reviewGenderType, productIdx);
  return res.send(response(baseResponse.SUCCESS, reviewByGenderType));
};

exports.patchReview = async function (req, res) {
  /**
   * path variable : userIdx, productIdx
   * body : rating, sizeRating, brightnessRating, colorRating, message
   */
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const userIdx = req.params.userIdx;
  const productIdx = req.params.productIdx;
  const {rating, sizeRating, brightnessRating, colorRating, message} = req.body;

  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    const editReview = await reviewService.editReview(rating, sizeRating, brightnessRating, colorRating, message, userIdx, productIdx);

    return res.send(editReview);
  }
};

exports.patchDeleteReview = async function (req, res) {
  /**
   * path variable : userIdx
   * body: status
   */
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const userIdx = req.params.userIdx;
  const {status} = req.body;

  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    const editStatus = await reviewService.editStatus(status, userIdx);

    return res.send(editStatus);
  }
};