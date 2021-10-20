const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
// const deliveryProvider = require("./deliveryProvider");
const deliveryDao = require("./deliveryDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

// 상태 값 변경
exports.editStatus = async function (status, userIdx, deliveryIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const editStatusResult = await deliveryDao.updateStatus(connection, status, userIdx, deliveryIdx);
    connection.release();

    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - editStatus Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
}