const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const couponDao = require("./couponDao");

exports.couponCheck = async function (couponName) {
  const connection = await pool.getConnection(async (conn) => conn);
  const couponNameCheckResult = await couponDao.selectCouponName(connection, couponName);
  connection.release();

  return couponNameCheckResult;
}

exports.retrieveCouponList = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const couponListResult = await couponDao.selectCouponList(connection, userIdx);
  connection.release();

  return couponListResult;
}