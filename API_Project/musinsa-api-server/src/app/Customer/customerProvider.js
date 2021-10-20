const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const customerDao = require("./customerDao");

// userId로 회원 테이블 조회
exports.retrieveCustomerList = async function (userId) {
  if (!userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const customerListResult = await customerDao.selectCustomer(connection);
    connection.release();

    return customerListResult;

  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const customerListResult = await customerDao.selectCustomerUserId(connection, userId);
    connection.release();

    return customerListResult;
  }
};

// userId로 회원 check
exports.userIdCheck = async function (userId) {

  const connection = await pool.getConnection(async (conn) => conn);
  const userIdCheckResult = await customerDao.selectCustomerUserId(connection, userId);
  connection.release();

  return userIdCheckResult;
};

// email로 회원 테이블 조회
exports.emailCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await customerDao.selectCustomerEmail(connection, email);
  connection.release();

  return emailCheckResult;
};

// password로 회원 테이블 조회
exports.passwordCheck = async function (selectCustomerPasswordParams) {

  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await customerDao.selectCustomerPassword(
      connection,
      selectCustomerPasswordParams
  );
  connection.release();
  return passwordCheckResult[0];
};

// nickname 중복 조회
exports.nickNameCheck = async function (nickName) {
  const connection = await pool.getConnection(async (conn) => conn);
  const customerNickNameResult = await customerDao.selectCustomerNickName(connection, nickName);
  connection.release();

  return customerNickNameResult;
};

exports.recipientCheck = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const customerRecipientResult = await customerDao.selectCustomerRecipient(connection, userIdx);
  connection.release();

  return customerRecipientResult;
};

// userId로 회원 상태값 조회
exports.accountCheck = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const customerAccountResult = await customerDao.selectCustomerAccount(connection, userId);
  connection.release();

  return customerAccountResult;
};