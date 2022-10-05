const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const reviewProvider = require("./reviewProvider");
const reviewDao = require("./reviewDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

exports.registerReview = async function (userIdx, productName, rating, sizeRating, brightnessRating, colorRating, message, type) {
  try {
    // 배달 받은 상품인지 체크
    const productNameRows = await reviewProvider.reviewByProductCheck(productName);

    if (productNameRows.length==0) {
      return errResponse(baseResponse.DELIVERY_PRODUCT_NOT_EXIST);

    } else {
      // 배달 받은 상품은 리뷰 등록
      const insertReviewParams = [userIdx, productName, rating, sizeRating, brightnessRating, colorRating, message, type];
      const connection = await pool.getConnection(async (conn) => conn);

      const reviewResult = await reviewDao.insertReview(connection, insertReviewParams);

      console.log(`추가된 리뷰 : ${reviewResult[0].insertId}`)
      connection.release();
      return response(baseResponse.SUCCESS);
    }

  } catch (err) {
    logger.error(`App - registerReview Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

exports.editReview = async function (rating, sizeRating, brightnessRating, colorRating, message, userIdx, productIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const editReviewResult = await reviewDao.updateReview(connection, rating, sizeRating, brightnessRating, colorRating, message, userIdx, productIdx);
    connection.release();

    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - editReview Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

exports.editStatus = async function (status, userIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const editStatusResult = await reviewDao.updateStatus(connection, status, userIdx);
    connection.release();

    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - editStatus Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};