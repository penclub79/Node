const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const likeDao = require("./likeDao");

exports.retrieveCustom = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userIdResult = await likeDao.selectUserId(connection, userIdx);

  connection.release();

  return userIdResult;
};

exports.retrieveCustomBrand = async function (userIdx) {

  const connection = await pool.getConnection(async (conn) => conn);
  console.log(userIdx);
  const userIdBrandResult = await likeDao.selectUserIdByBrand(connection, userIdx);

  connection.release();

  return userIdBrandResult;
};

exports.likeIdxCheck = async function (productIdx) {

  const connection = await pool.getConnection(async (conn) => conn);
  console.log(productIdx);
  const likeIdxResult = await likeDao.selectLikeIdx(connection, productIdx);

  connection.release();

  return likeIdxResult;
}