const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const memberDao = require("./memberDao");

exports.retrieveMember = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const memberResult = await memberDao.selectMember(connection, userIdx);

  connection.release();

  return memberResult[0];
};