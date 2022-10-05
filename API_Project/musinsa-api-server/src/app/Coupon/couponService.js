const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const couponProvider = require("./couponProvider");
const couponDao = require("./couponDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createCoupon = async function (
    couponName,
    couponDiscount,
    couponRange,
    couponStatus,
    startTime,
    endTime,
    couponImgPath
) {
  try {
    // 쿠폰명 중복 확인
    const couponRows = await couponProvider.couponCheck(couponName);
    if (couponRows.length > 0)
      return errResponse(baseResponse.COUPON_REDUNDANT_NAME);

    const insertCouponParams = [
      couponName,
      couponDiscount,
      couponRange,
      couponStatus,
      startTime,
      endTime,
      couponImgPath
    ];

    const connection = await pool.getConnection(async (conn) => conn);

    const couponResult = await couponDao.insertCoupon(connection, insertCouponParams);
    console.log(`추가된 쿠폰idx : ${couponResult[0].insertId}`);
    connection.release();

    return response(baseResponse.SUCCESS);

  } catch (err) {
    logger.error(`App - createCoupon Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
}