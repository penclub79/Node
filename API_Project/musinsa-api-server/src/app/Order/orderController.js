const orderProvider = require("../../app/Order/orderProvider");
const orderService = require("../../app/Order/orderService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

// 주문 등록
exports.postOrder = async function (req, res) {
  /**
   * Body : userId, productName, productSize, orderNum, deliveryMessage
   */
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const userIdx = req.params.userIdx;
  const {productName, productSize, orderNum, deliveryMessage, isCoupon, point, reserve} = req.body;

  // 토큰 값 비교
  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    // 상품명 빈 값 체크
    if (!productName)
      return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    // 상품사이즈 String 체크
    if (!isNaN(productName))
      return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    // 상품 타입별 수량 타입 체크
    const productSizeRows = await orderProvider.productSizeCheck(productName);
    console.log(productSizeRows[0].categoryName);
    // 상품명의 카테고리가 shoes면 신발 사이즈 입력
    if (productSizeRows[0].categoryName == 'shoes') {
      // 신발 사이즈에 숫자인지 체크
        if (isNaN(productSize))
          return res.send(errResponse(baseResponse.ORDER_SIZE_SHOES_EXIST));
      // 신발 사이즈 200 ~ 400 체크
        if (productSize < 200 || productSize > 400)
          return res.send(errResponse(baseResponse.ORDER_SIZE_SHOES_NUM_EXIST));
    } else { // shoes가 아니면 XL, L, M, S로 입력
      // 기타 사이즈에 스트링인지 체크
        if (!isNaN(productSize))
          return res.send(errResponse(baseResponse.ORDER_SIZE_ETC_NOT_NUM));

        if (productSize != 'XL' && productSize != 'L' && productSize != 'M' && productSize != 'S')
          return res.send(errResponse(baseResponse.ORDER_SIZE_ETC_EXIST));
    };

    // 수량 String 체크
    if (!orderNum)
      return res.send(errResponse(baseResponse.ORDER_NUM_NOT_STRING));

    // 수량 1 ~ 99까지
    if ( 1 > orderNum && orderNum > 99)
      return res.send(errResponse(baseResponse.ORDER_NUM_RANGE_FAIL));

    // 메세지 빈 값 체크
    if (!deliveryMessage)
      return res.send(errResponse(baseResponse.ORDER_MESSAGE_EMPTY));

    // 상품 기본 세일, 가격
    const productSale = await orderProvider.productSaleCheck(productName);
    const price = productSale[0].price;
    const salesRate = productSale[0].salesRate;

    // 유저 쿠폰 사용
    const userCoupons = await orderProvider.userCouponCheck(userIdx);

    if (userCoupons.length == 0)
      return res.send(errResponse(baseResponse.ORDER_USER_COUPON_EXIST));

    if (userCoupons[0].couponRange != 'ALL' && userCoupons[0].couponRange != productName)
      return res.send(errResponse(baseResponse.ORDER_COUPON_NOT_USE));

    const couponIdx = userCoupons[0].idx;
    // 그리고 userCoupon 변수에 쿠폰 할인율을 적용
    const userCoupon = userCoupons[0].couponDiscount;

    // 유저 적립금, 포인트, 등급할인율 조회 후 액수에 따른 사용
    const userMemberInfo = await orderProvider.userReserve(userIdx);

    if (userMemberInfo[0].point < point)
      return res.send(errResponse(baseResponse.ORDER_USER_POINT_FAIL));

    // 조회한 적립금 보다 높게 썼을시, 적립금이 부족하다는 에러메세지를 띄움
    if (userMemberInfo[0].reserves < reserve)
      return res.send(errResponse(baseResponse.ORDER_USER_RESERVE_FAIL));

    // 유저 등급 할인율 반영
    const levelRate = userMemberInfo[0].gradeDiscount;

    const totalPrice = price * orderNum;
    const orderPrice = totalPrice - (totalPrice * userCoupon/100) - point - reserve - (totalPrice * salesRate/100) - (totalPrice * levelRate/100);

    const signUpResponse = await orderService.orderRegistration(
        userIdx,
        productName,
        productSize,
        orderNum,
        deliveryMessage,
        orderPrice
    );

    // 만약 쿠폰 사용 Y면 update로 coupon status를 N으로 바꾸고, 사용한 productIdx를 coupon Table에 적용
    const updateCouponStatus = await orderService.couponStatus(
        couponIdx,
        productName
    );

    return res.send(signUpResponse);
  }
};

// 주문 조회
exports.getOrderListByUserId = async function (req, res) {
  /**
   * Path Variable: userIdx
   */
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const userIdx = req.params.userIdx;

  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    const orderByUserId = await orderProvider.retrieveUserOrder(userIdx);
    return res.send(response(baseResponse.SUCCESS, orderByUserId));
  }
};

// 주문 총 금액
exports.getOrderTotalPrice = async function (req, res) {
  /**
   * Path Variable: userIdx
   */
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const userIdx = req.params.userIdx;

  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    const orderTotal = await orderProvider.retrieveUserOrderTotal(userIdx);
    return res.send(response(baseResponse.SUCCESS, orderTotal));
  }
};