const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const likeProvider = require("./likeProvider");
const likeDao = require("./likeDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

exports.isLikeProduct = async function (isLikeProduct, userIdx, productIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const likeIdxCheck = await likeProvider.likeIdxCheck(productIdx);
    if (likeIdxCheck.length == 0) {
      const insertLikeParams = [isLikeProduct, userIdx, productIdx]
      const likeProductResult = await likeDao.insertLikeProduct(connection, insertLikeParams);
    } else {
      const isLikeProductResult = await likeDao.updateLikeProduct(connection, isLikeProduct, userIdx, productIdx);
      connection.release();
    }
    return response(baseResponse.SUCCESS);

  } catch (err) {
    logger.error(`App - isLikeProduct Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};