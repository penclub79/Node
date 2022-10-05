const jwtMiddleware = require("../../../config/jwtMiddleware");
const couponProvider = require("../../app/Coupon/couponProvider");
const couponService = require("../../app/Coupon/couponService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

// 쿠폰 생성
exports.postCoupon = async function (req, res) {
  /**
   * Body: couponName, couponDiscount, couponRange, couponStatus,
   * startTime, endTime, couponImgPath
   * **/
  const {
    couponName,
    couponDiscount,
    couponRange,
    couponStatus,
    startTime,
    endTime,
    couponImgPath
  } = req.body;

  // 쿠폰명 입력 체크

  // 적용할 할인값을 입력하세요.

  // 시간을 입력하세요(startTime)

  // 시간을 입력하세요(endTime)

  // 해당 사용자는 이미 받은 쿠폰입니다.


  const signUpResponse = await couponService.createCoupon(
      couponName,
      couponDiscount,
      couponRange,
      couponStatus,
      startTime,
      endTime,
      couponImgPath
  );

  return res.send(signUpResponse);
};

// 쿠폰 사용가능한것 조회
exports.getCoupons = async function (req, res) {
  /**
   * Path Variable: userId
   * **/
  const userIdx = req.params.userIdx;

  if (!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

  const couponList = await couponProvider.retrieveCouponList(userIdx);
  return res.send(response(baseResponse.SUCCESS, couponList));
};