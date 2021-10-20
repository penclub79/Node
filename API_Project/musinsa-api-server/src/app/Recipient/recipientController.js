const recipientProvider = require('../../app/Recipient/recipientProvider');
const recipientService = require('../../app/Recipient/recipientService');
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

exports.postRecipient = async function (req, res) {

  /**
   * path variable : userIdx
   *
   * body : recipientName, recipientAddressName, recipientAddress
   * **/
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const userIdx = req.params.userIdx;
  const { recipientName, recipientAddressName, recipientTelephone, recipientAddress } = req.body;

  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    const signUpResponse = await recipientService.recipientRegistration(
        userIdx,
        recipientName,
        recipientAddressName,
        recipientTelephone,
        recipientAddress
    );

    return res.send(signUpResponse);
  }
};

exports.getRecipientListByUserIdx = async function (req, res) {
  /**
   * Path Variable: userIdx
   * **/
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const userIdx = req.params.userIdx;

  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    if (!userIdx) return res.send(errResponse(baseResponse.USER_IDX_EMPTY));

    const recipientByUserIdx = await recipientProvider.retrieveUserRecipient(userIdx);

    // 삭제된 배송지 조회시 errRes
    if (recipientByUserIdx.length == 0) {
      return res.send(errResponse(baseResponse.RECIPIENT_USER_NOT_FIND_VALUE));
    }

    return res.send(response(baseResponse.SUCCESS, recipientByUserIdx));
  }
};

exports.patchRecipientInfo = async function (req, res) {
  /**
   * Path Variable: userIdx, recipientIdx
   */
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const userIdx = req.params.userIdx;
  const recipientIdx = req.params.recipientIdx;
  const {recipientName, recipientAddressName, recipientTelephone, recipientAddress} = req.body;

  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    if (!userIdx) return res.send(errResponse(baseResponse.USER_IDX_EMPTY));

    if (!recipientIdx) return res.send(errResponse(baseResponse.RECIPIENT_IDX_EMPTY));

    const editRecipientInfo = await recipientService.editRecipientInfo(recipientName, recipientAddressName, recipientTelephone, recipientAddress, userIdx, recipientIdx);

    return res.send(editRecipientInfo);
  }
};

exports.patchRecipientStatus = async function (req, res) {
  /**
   * Path Variable: userIdx, recipientIdx
   * Body: status
   */
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const userIdx = req.params.userIdx;
  const recipientIdx = req.params.recipientIdx;
  const {status} = req.body;

  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    if (!userIdx) return res.send(errResponse(baseResponse.USER_IDX_EMPTY));

    if (!recipientIdx) return res.send(errResponse(baseResponse.RECIPIENT_IDX_EMPTY));

    const editRecipientStatus = await recipientService.editRecipientStatus(status, userIdx, recipientIdx);

    return res.send(editRecipientStatus);
  }
};