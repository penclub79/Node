const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const basketDao = require("./basketDao");

exports.retrieveUser = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userIdxResult = await basketDao.selectUserIdx(connection, userIdx);
  connection.release();

  return userIdxResult;
};

exports.retrieveUserBasket = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const basketResult = await basketDao.selectUserBasket(connection, userIdx);
  connection.release();

  return basketResult;
};

exports.productInfoCheck = async function (productIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const productResult = await basketDao.selectProductInfo(connection, productIdx);
  connection.release();

  return productResult;
};

exports.basketStatusCheck = async function (basketIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const basketResult = await basketDao.selectBasketStatus(connection, basketIdx);
  connection.release();

  return basketResult;
};