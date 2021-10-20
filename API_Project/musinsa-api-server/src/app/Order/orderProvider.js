const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const orderDao = require("./orderDao");

// userId로 order 조회
exports.retrieveUserOrder = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const orderResult = await orderDao.selectOrderByUserId(connection, userIdx);

  connection.release();

  return orderResult;
};

exports.retrieveUserOrderTotal = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const totalPriceResult = await orderDao.selectOrderPriceTotal(connection, userIdx);

  connection.release();

  return totalPriceResult;
};

// 상품 카테고리 체크 - 주문할때 사이즈 반영
exports.productSizeCheck = async function (productName) {
  const connection = await pool.getConnection(async (conn) => conn);
  const sizeResult = await orderDao.selectProductSize(connection, productName);
  connection.release();

  return sizeResult;
};

// 상품 세일 체크
exports.productSaleCheck = async function (productName) {
  const connection = await pool.getConnection(async (conn) => conn);
  const saleResult = await orderDao.selectProductSale(connection, productName);
  connection.release();

  return saleResult;
};

// 유저 쿠폰 체크 - 주문할시 사용여부 반영
exports.userCouponCheck = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const couponResult = await orderDao.selectUserCoupon(connection, userIdx);
  connection.release();

  return couponResult;
};

// 유저 적립금 조회 체크
exports.userReserve = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const reserveResult = await orderDao.selectUserReserve(connection, userIdx);
  connection.release();

  return reserveResult;
};
//
// // 유저 포인트 조회 체크
// exports.userPoint = async function (userIdx) {
//   const connection = await pool.getConnection(async (conn) => conn);
//   const pointResult = await orderDao.selectUserPoint(connection, userIdx);
//   connection.release();
//
//   return pointResult;
// };
//
// // 유저 등급 조회 체크
// exports.userGrade = async function (userIdx) {
//   const connection = await pool.getConnection(async (conn) => conn);
//   const gradeResult = await orderDao.selectUserGrade(connection, userIdx);
//   connection.release();
//
//   return gradeResult;
// };

