const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const recipientDao = require("./recipientDao");

exports.retrieveUserRecipient = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const recipientResult = await recipientDao.selectRecipientByUserIdx(connection, userIdx);

  connection.release();

  return recipientResult;
};