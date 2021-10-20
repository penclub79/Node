const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const tagDao = require("./tagDao");

exports.retrieveTag = async function (productTag) {
  const connection = await pool.getConnection(async (conn) => conn);

  const tagProductListResult = await tagDao.selectTagProduct(connection, productTag);
  connection.release();

  return tagProductListResult;
};