const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
// const orderProvider = require("./orderProvider");
const recipientDao = require("./recipientDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

exports.recipientRegistration = async function (userIdx, recipientName, recipientAddressName, recipientTelephone, recipientAddress) {
  try {

    const insertRecipientParams = [userIdx, recipientName, recipientAddressName, recipientTelephone, recipientAddress];

    const connection = await pool.getConnection(async (conn) => conn);

    const recipientResult = await recipientDao.insertRecipient(connection, insertRecipientParams);
    console.log(`추가된 배송지정보 : ${recipientResult[0].insertId}`);
    connection.release();
    return response(baseResponse.SUCCESS);

  } catch (err) {
    logger.error(`App - recipientRegistration Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

exports.editRecipientInfo = async function (recipientName, recipientAddressName, recipientTelephone, recipientAddress, userIdx, recipientIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    const editRecipientInfoResult = await recipientDao.updateRecipientInfo(connection, recipientName, recipientAddressName, recipientTelephone, recipientAddress, userIdx, recipientIdx)

    connection.release();

    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - editRecipientInfo Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

exports.editRecipientStatus = async function (status, userIdx, recipientIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    const editRecipientStatusResult = await recipientDao.updateRecipientStatus(connection, status, userIdx, recipientIdx);
    connection.release();

    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - editRecipientStatus Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};