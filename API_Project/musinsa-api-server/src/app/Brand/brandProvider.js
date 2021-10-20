const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const brandDao = require("./brandDao");

exports.retrieveBrand = async function (brandName) {
  if (!brandName) {
    const connection = await pool.getConnection(async (conn) => conn);
    const brandListResult = await brandDao.selectBrand(connection);
    connection.release();

    return brandListResult;
  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const brandNameResult = await brandDao.selectBrandName(connection, brandName);
    connection.release();

    return brandNameResult;
  }
};