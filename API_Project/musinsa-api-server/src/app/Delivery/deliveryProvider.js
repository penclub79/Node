const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const deliveryDao = require('./deliveryDao');

// status로 배송 테이블 조회
exports.retrieveStatus = async function (deliveryStatus, userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const deliveryResult = await deliveryDao.selectDeliveryStatus(connection, deliveryStatus, userIdx);

  connection.release();

  return deliveryResult;
};