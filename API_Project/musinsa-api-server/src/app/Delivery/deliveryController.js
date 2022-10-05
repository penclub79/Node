const deliveryProvider = require("../../app/Delivery/deliveryProvider");
const deliveryService = require("../../app/Delivery/deliveryService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

exports.getDeliveryByStatus = async function (req, res) {
  /**
   * Path Variable: status
   */
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const userIdx = req.params.userIdx;
  const deliveryStatus = req.params.status;

  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    if (!deliveryStatus) return res.send(errResponse(baseResponse.DELIVERY_STATUS_EMPTY));

    const deliveryByStatus = await deliveryProvider.retrieveStatus(deliveryStatus, userIdx);
    return res.send(response(baseResponse.SUCCESS, deliveryByStatus));
  }
};

exports.patchDeliveryStatus = async function (req, res) {
  /**
   * path variable: deliveryIdx
   * body: status
   */
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const userIdx = req.params.userIdx;
  const deliveryIdx = req.params.deliveryIdx;
  const {status} = req.body;

  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    if (!deliveryIdx) return res.send(errResponse(baseResponse.DELIVERY_IDX_EMPTY));

    const editStatus = await deliveryService.editStatus(status, userIdx, deliveryIdx);

    return res.send(editStatus);
  }
};