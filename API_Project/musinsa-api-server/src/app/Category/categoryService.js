const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
// const tagProvider = require("./tagProvider");
const categoryDao = require("./categoryDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

// category 삭제
exports.editStatus = async function (status, categoryIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const editStatusResult = await categoryDao.updateStatus(connection, status, categoryIdx);
    connection.release();

    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - editStatus Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
}