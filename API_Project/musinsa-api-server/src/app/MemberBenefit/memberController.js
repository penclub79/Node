const jwtMiddleware = require("../../../config/jwtMiddleware");
const memberProvider = require("../../app/MemberBenefit/memberProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

exports.getUserByMember = async function (req, res) {
  /**
   * Path Variable: userIdx
   * **/
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const userIdx = req.params.userIdx;

  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    if (!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const userByMember = await memberProvider.retrieveMember(userIdx);
    return res.send(response(baseResponse.SUCCESS, userByMember));
  }
};