const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const categoryDao = require("./categoryDao");

exports.retrieveCategory = async function (categoryName){
  if (!categoryName) {
    const connection = await pool.getConnection(async (conn) => conn);
    const categoryTotalResult = await categoryDao.selectCategoryTotal(connection);
    connection.release();

    return categoryTotalResult;

  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const categoryResult = await categoryDao.selectCategory(connection, categoryName);

    connection.release();

    return categoryResult;
  }
};