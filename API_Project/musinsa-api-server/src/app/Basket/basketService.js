const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
// const basketProvider = require("./basketProvider");
const basketDao = require("./basketDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

exports.createBasket = async function (userIdx, brandName, productName, productSize, productCnt) {
  try {
    const inserBasketParams = [userIdx, brandName, productName, productSize, productCnt];

    const connection = await pool.getConnection(async (conn) => conn);

    const basketResult = await basketDao.insertBasket(connection, inserBasketParams);
    console.log(`추가된 장바구니 : ${basketResult[0].insertId}`);
    connection.release();

    return response(baseResponse.BASKET_REGISTER_SUCCESS, {"idx" : basketResult[0].insertId});

  } catch (err) {
    logger.error(`App - createBasket Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

// 구매했을시 업데이트
exports.editIsBuy = async function (isBuy, userIdx, basketIdx) {
  try {

    const connection = await pool.getConnection(async (conn) => conn);
    const editIsBuyResult = await basketDao.updateIsBuy(connection, isBuy, userIdx, basketIdx);
    connection.release();

    return response(baseResponse.BASKET_BUYCHECK_SUCCESS, {'idx' : basketIdx});

  } catch (err) {
    logger.error(`App - editIsBuy Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
}

// 장바구니 삭제
exports.editStatus = async function (status, userIdx, basketIdx) {
  try {

    const connection = await pool.getConnection(async (conn) => conn);
    const editStatusResult = await basketDao.updateStatus(connection, status, userIdx, basketIdx);

    connection.release();

    return response(baseResponse.BASKET_STATUS_DELETE, {'idx' : basketIdx});

  } catch (err) {
    logger.error(`App - editStatus Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
}