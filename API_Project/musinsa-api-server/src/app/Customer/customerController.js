const jwtMiddleware = require("../../../config/jwtMiddleware");
const {response, errResponse} = require("../../../config/response");
const customerProvider = require("../../app/Customer/customerProvider");
const customerService = require("../../app/Customer/customerService");
const baseResponse = require("../../../config/baseResponseStatus");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/** API no.1 유저 조회 **/
exports.getCustomers = async function (req, res) {

  const userId = req.query.userId;

  if (!userId) {
    // 유저 전체 조회
    const customerListResult = await customerProvider.retrieveCustomerList();
    return res.send(response(baseResponse.SUCCESS, customerListResult));

  } else {
    // 유저 검색 조회
    const customerListByUserId = await customerProvider.retrieveCustomerList(userId);
    return res.send(response(baseResponse.SUCCESS, customerListByUserId));
  }
};

exports.getCustomerById = async function (req, res) {
  const userId = req.params.userId;
  // ID 빈 값 체크
  if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

  // 해당 유저ID 가입유무
  const userIdRows = await customerProvider.userIdCheck(userId);

  if (userIdRows[0].userId == null) { // null이면 ID가 비어있다.
    return res.send(response(baseResponse.USER_USERID_NOT_EXIST));
  } else {
    const customerByUserId = await customerProvider.retrieveCustomerList(userId);
    return res.send(response(baseResponse.SUCCESS, customerByUserId));
  }
};

/** API no.2 유저 생성 **/
exports.postCustomers = async function (req, res){
  var special_patten = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
  var password_check = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
  var phone_check = /^\d{3}-\d{3,4}-\d{4}$/;

  const {userId, password, name, nickName, email, phone} = req.body;

  // 아이디 빈 값 체크
  if (!userId)
    return res.send(response(baseResponse.SIGNUP_USERID_EMPTY));

  // id 아이디 최소 5글자 이상 and 최대 11글자 미만
  if (userId.length < 5 || userId.length > 11)
    return res.send(response(baseResponse.SIGNUP_USERID_LENGTH));

  // id 아이디 특수문자 포함(X)
  if (special_patten.test(userId))
    return res.send(response(baseResponse.SIGNUP_USERID_SPECIAL_PATTEN));

  // userId String 형식(int X) 검사
  if (!isNaN(userId))
    return res.send(response(baseResponse.SIGNUP_USERID_NOT_NUM));

  // 패드워드 빈 값 체크
  if (!password)
    return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));

  // 패스워드 최소 8자
  if (password.length < 8)
    return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));

  // 패스워드 숫자, 영문, 특수문자 조합 포함
  if (!password_check.test(password))
    return res.send(response(baseResponse.SIGNUP_PASSWORD_INCLUDE));

  // 이름 빈 값 체크
  if (!name)
    return res.send(response(baseResponse.SIGNUP_NAME_EMPTY));

  // 이름 String 형식(int X) 검사
  if (!isNaN(name))
    return res.send(response(baseResponse.SIGNUP_NAME_NOT_INCLUDE_NUM));

  // 이름 20자리 이상 체크
  if (name > 20)
    return res.send(response(baseResponse.SIGNUP_NAME_LENGTH));

  // 이메일 빈 값 체크
  if (!email)
    return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

  // 이메일 길이 체크
  if (email.length > 30)
    return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

  // 이메일 형식 체크 (by 정규표현식)
  if (!regexEmail.test(email))
    return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

  // 전화번호 빈 값 체크
  if (!phone)
    return res.send(response(baseResponse.SIGNUP_PHONENUM_EMPTY));

  // 전화번호 포맷 체크
  if (!phone_check.test(phone))
    return res.send(response(baseResponse.SIGNUP_PHONENUM_NOT_FORM));

  // 닉네임 빈 값 체크
  if (!nickName)
    return res.send(response(baseResponse.SIGNUP_PHONENUM_NOT_FORM));

  // 닉네임 최대 10자리 체크
  if (nickName.length > 10)
    return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));

  const signUpResponse = await customerService.createCustomer(
      userId,
      password,
      name,
      nickName,
      email,
      phone
  );

    return res.send(signUpResponse);

};

/** API no.4 로그인 **/
exports.login = async function (req, res) {
  const {userId, password} = req.body;

  // 아이디 빈 값 체크
  if (!userId)
    return res.send(response(baseResponse.USER_USERID_EMPTY));

  const signInResponse = await customerService.postSignIn(userId, password);

  return res.send(signInResponse);
  // TODO: userId, password 형식적 Validation
  // const signInResponse = await customerService.
};

exports.patchCustomers = async function (req, res) {
  /**
   * body : nickName, profileUrl, password, email, phone, recipientIdx, height, weight
   * **/
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const userIdx = req.params.userIdx;
  const {nickName, profileUrl, password, email, phone, recipientIdx, height, weight} = req.body;
  var password_check = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
  var phone_check = /^\d{3}-\d{3,4}-\d{4}$/;

  // 유저 idx 빈 값 체크
  if (!userIdx) return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));

  // 토큰 값 비교
  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {

    // 패드워드 빈 값 체크
    if (!password)
      return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));

    // 패스워드 최소 8자
    if (password.length < 8)
      return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));

    // 패스워드 숫자, 영문, 특수문자 조합 포함
    if (!password_check.test(password))
      return res.send(response(baseResponse.SIGNUP_PASSWORD_INCLUDE));

    // 이메일 빈 값 체크
    if (!email)
      return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

    // 이메일 길이 체크
    if (email.length > 30)
      return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

    // 이메일 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
      return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    // 전화번호 빈 값 체크
    if (!phone)
      return res.send(response(baseResponse.SIGNUP_PHONENUM_EMPTY));

    // 전화번호 포맷 체크
    if (!phone_check.test(phone))
      return res.send(response(baseResponse.SIGNUP_PHONENUM_NOT_FORM));

    // 닉네임 빈 값 체크
    if (!nickName)
      return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));

    // 닉네임 최대 10자리 체크
    if (nickName.length > 10)
      return res.send(response(baseResponse.SIGNUP_NICKNAME_LENGTH));

    // height String 형식(int X) 검사
    if (isNaN(height) === true)
      return res.send(response(baseResponse.SIGNUP_HEIGHT_NOT_INCLUDE_STR));

    // weight String 형식(int X) 검사
    if (isNaN(weight) === true)
      return res.send(response(baseResponse.SIGNUP_WEIGHT_NOT_INCLUDE_STR));

    const editUserInfo = await customerService.editUserInfo(nickName, profileUrl, password, email, phone, recipientIdx, height, weight, userIdx);

    return res.send(editUserInfo);
  };
};

exports.patchCustomerStatus = async function (req, res) {
  /**
   * body: status='LOCK' or status='DELETE'
   * **/
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const userIdx = req.params.userIdx;
  const {status} = req.body;

  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    if (status != 'LOCK' && status != 'DELETE' && status != 'ACTIVE')
      return res.send(errResponse(baseResponse.USER_STATUS_NOT_FORM));

    const editStatus = await customerService.editStatus(status, userIdx);

    return res.send(editStatus);
  }
};
/** API no.3 유저 추가정보기입 및 수정 **/
// userId 조회 후 insert


/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
  const userIdResult = req.verifiedToken.userId;
  console.log(userIdResult);
  return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};