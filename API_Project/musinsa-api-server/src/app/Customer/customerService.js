const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const customerProvider = require("./customerProvider");
const customerDao = require("./customerDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createCustomer = async function (userId, password, name, nickName, email, phone) {
  try {
    // ID 중복 확인
    const userIdRows = await customerProvider.userIdCheck(userId);
    if (userIdRows[0].userId != null) // null이면 ID가 비어있다.
      return errResponse(baseResponse.SIGNUP_REDUNDANT_USERID);

    // 닉네임 중복 확인
    const nickNameRows = await customerProvider.nickNameCheck(nickName);
    console.log(nickNameRows);
    if (nickNameRows.length > 0)
      return errResponse(baseResponse.SIGNUP_REDUNDANT_NICKNAME);

    // 이메일 중복 확인
    const emailRows = await customerProvider.emailCheck(email);
    if (emailRows.length > 0)
      return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);

    // 비밀번호 암호화
    const hashedPassword = await crypto
    .createHash("sha512")
    .update(password)
    .digest("hex");

    const insertCustomerParams = [userId, hashedPassword, name, nickName, email, phone];

    const connection = await pool.getConnection(async (conn) => conn);

    const customerResult = await customerDao.insertCustomer(connection, insertCustomerParams);
    console.log(`추가된 회원 : ${customerResult[0].insertId}`)
    connection.release();
    return response(baseResponse.USER_CREATE_SUCCESS, `추가된 회원idx : ${customerResult[0].insertId}`);

  } catch (err) {
    logger.error(`App - createCustomer Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

// TODO: After 로그인 인증 방법 (JWT)
exports.postSignIn = async function (userId, password) {
  try {
    // userId 여부 확인
    const userIdRows = await customerProvider.userIdCheck(userId);
    if (userIdRows[0].userId == null) // null이면 ID가 비어있다.
      return errResponse(baseResponse.SIGNIN_USERID_NOT_EXIST);

    const selectUserId = userIdRows[0].userId

    // 비밀번호 확인
    const hashedPassword = await crypto
    .createHash("sha512")
    .update(password)
    .digest("hex");

    const selectCustomerPasswordParams = [selectUserId, hashedPassword];

    const passwordRows = await customerProvider.passwordCheck(selectCustomerPasswordParams);
    if (passwordRows[0].password !== hashedPassword) {
      return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
    }

    // 계정 상태 확인
    const userInfoRows = await customerProvider.accountCheck(userId);

    if (userInfoRows[0].status === "LOCK") {
      return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    } else if (userInfoRows[0].status === "DELETE") {
      return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }

    console.log(userInfoRows[0].userId) // DB의 userId

    //토큰 생성 Service
    let token = await jwt.sign(
        {
          userIdx: userInfoRows[0].idx,
        }, // 토큰의 내용(payload)
        secret_config.jwtsecret, // 비밀키
        {
          expiresIn: "365d",
          subject: "userInfo",
        } // 유효 기간 365일
    );
    // console.log(token);
    return response(baseResponse.LOGIN_SUCCESS, {'userIdx': userInfoRows[0].idx, 'jwt': token});

  } catch (err) {
    logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

exports.editUserInfo = async function (nickName, profileUrl, password, email, phone, recipientIdx, height, weight, userIdx) {
  try {

    // 닉네임 중복 확인
    const nickNameRows = await customerProvider.nickNameCheck(nickName);
    if (nickNameRows.length > 0)
      return errResponse(baseResponse.SIGNUP_REDUNDANT_NICKNAME);

    // 이메일 중복 확인
    const emailRows = await customerProvider.emailCheck(email);
    if (emailRows.length > 0)
      return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);

    // 배송지 여부 확인
    const recipientRows = await customerProvider.recipientCheck(userIdx);
    if (recipientRows.length == 0) // 배송지가 비었을 때
      return errResponse(baseResponse.SIGNUP_RECIPIENT_EMPTY);

    if (recipientRows[0].idx != recipientIdx) // 배송지 idx값이 틀릴 때
      return errResponse(baseResponse.SIGNUP_RECIPIENT_NOT_EXIST);

    // 비밀번호 암호화
    const hashedPassword = await crypto
    .createHash("sha512")
    .update(password)
    .digest("hex");

    const connection = await pool.getConnection(async (conn) => conn);
    const editUserInfoResult = await customerDao.updateCustomerInfo(connection, nickName, profileUrl, hashedPassword, email, phone, recipientIdx, height, weight, userIdx);
    connection.release();

    return response(baseResponse.USER_MODIFY_SUCCESS);
  } catch (err) {
    logger.error(`App - editUserInfo Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

exports.editStatus = async function (status, userIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const editStatusResult = await customerDao.updateStatus(connection, status, userIdx);
    connection.release();

    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - editStatus Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

// exports.editCustomer = async function (idx, nickname) {
//   try {
//     console.log(idx);
//     const connection = await pool.getConnection(async (conn) => conn);
//     const editCustomerResult = await customerDao.updateCustomerInfo(connection, idx, nickname);
//     connection.release();
//
//     return response(baseResponse.SUCCESS);
//
//   } catch (err) {
//     logger.error(`App - editCustomer Service error\n: ${err.message}`);
//     return errResponse(baseResponse.DB_ERROR);
//   }
// }

