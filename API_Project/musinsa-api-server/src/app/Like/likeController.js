const jwtMiddleware = require("../../../config/jwtMiddleware");
const likeProvider = require("../../app/Like/likeProvider");
const likeService = require("../../app/Like/likeService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

exports.getUserByLike = async function (req, res) {
  /**
   * Path Variable: userId
   * **/
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const userIdx = req.params.userIdx;

  // if (!customIdx) return res.send(errResponse(baseResponse.USER_USERID));
  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    const userIdByLikeProduct = await likeProvider.retrieveCustom(userIdx);
    return res.send(response(baseResponse.SUCCESS, userIdByLikeProduct));
  }
};

exports.getUserByLikeBrand = async function (req, res) {
  /**
   * Path Variable: userId
   * **/

  const userIdx = req.params.userIdx;
  // if (!customIdx) return res.send(errResponse(baseResponse.USER_USERID));

  const userIdByLikeBrand = await likeProvider.retrieveCustomBrand(userIdx);
  return res.send(response(baseResponse.SUCCESS, userIdByLikeBrand));
};

exports.patchProductLike = async function (req, res) {
  /**
   * Path Variable: userIdx, productIdx
   * body: isLikeProduct
   */
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const userIdx = req.params.userIdx;
  const productIdx = req.params.productIdx;
  const {isLikeProduct} = req.body;

  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    const productLike = await likeService.isLikeProduct(isLikeProduct, userIdx, productIdx);

    return res.send(productLike);
  }
};