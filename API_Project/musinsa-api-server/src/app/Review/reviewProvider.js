const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const reviewDao = require("./reviewDao");

//배달 상품 체크
exports.reviewByProductCheck = async function (productName) {
  const connection = await pool.getConnection(async (conn) => conn);
  const deliveryProductCheckResult = await reviewDao.selectDeliveryProduct(connection, productName);
  connection.release();

  return deliveryProductCheckResult;
};

//상품 조회 - 리뷰
exports.retrieveReview = async function (productIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const reviewByProductNameResult = await reviewDao.selectProductNameReview(connection, productIdx);

  connection.release();

  return reviewByProductNameResult;
};

exports.userIdxCheck = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userIdxResult = await reviewDao.selectUserIdx(connection, userIdx);

  connection.release();

  return userIdxResult;
};

exports.retrieveReviewType = async function (reviewType, productIdx) {
  const connection = await pool.getConnection(async (conn) => conn);

  const reviewTypeResult = await reviewDao.selectReviewType(connection, reviewType, productIdx);
  connection.release();

  return reviewTypeResult;
};

exports.retrieveReviewGenderType = async function (reviewGenderType, productIdx) {
  const connection = await pool.getConnection(async (conn) => conn);

  const reviewGenderTypeResult = await reviewDao.selectReviewGenderType(connection, reviewGenderType, productIdx);
  connection.release();

  return reviewGenderTypeResult;
}