const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
// const orderProvider = require("./orderProvider");
const orderDao = require("./orderDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

exports.orderRegistration = async function (userIdx, productName, productSize, orderNum, deliveryMessage, orderPrice) {
  try {
    const insertOrderInfoParams = [userIdx, productName, productSize, orderNum, deliveryMessage, orderPrice];

    const connection = await pool.getConnection(async (conn) => conn);

    const orderResult = await orderDao.insertOrderInfo(connection, insertOrderInfoParams);
    console.log(`추가된 주문정보 : ${orderResult[0].insertId}`);
    connection.release();
    return response(baseResponse.SUCCESS);

  } catch (err) {
    logger.error(`App - orderRegistration Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

exports.couponStatus = async function (couponIdx, productName) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const editCouponResult = await orderDao.updateCouponInfo(connection, productName, couponIdx)
    connection.release();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - orderRegistration Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};