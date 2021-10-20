const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
// const brandProvider = require("./brandProvider");
const brandDao = require("./brandDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

exports.editStatus = async function (status, brandIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const editStatusResult = await brandDao.updateStatus(connection, status, brandIdx);
    connection.release();

    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - editStatus Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};