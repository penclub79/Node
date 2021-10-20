const jwtMiddleware = require("../../../config/jwtMiddleware");
const basketProvider = require("../../app/Basket/basketProvider");
const basketService = require("../../app/Basket/basketService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

exports.postBasket = async function (req, res) {
  /**
   * Path Variable: userIdx
   * Body: brandName, productName, basketNum
   * **/
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const productIdx = req.params.productIdx;
  const userIdx = req.params.userIdx;


  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {

    // 해당 유저는 없습니다.
    if (!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    if (!productIdx) return res.send(errResponse(baseResponse.PRODUCT_NOT_PRODUCT));

    // 해당 상품은 없습니다.
    const productInfoRows = await basketProvider.productInfoCheck(productIdx);

    if (productInfoRows.length > 0) { // 상품idx가 있으면 장바구니 등록

      const brandName = productInfoRows[0].brandName;
      const productName = productInfoRows[0].productName;
      const {productSize, productCnt} = req.body;

      if (!productSize)
        return res.send(errResponse(baseResponse.ORDER_SIZE_EMPTY));

      if (productInfoRows[0].categoryName == 'shoes') { // 신발이면 size는 int
        if (isNaN(productSize))
          return res.send(errResponse(baseResponse.ORDER_SIZE_SHOES_EXIST));

        if (productSize < 200 || productSize > 400)
          return res.send(errResponse(baseResponse.ORDER_SIZE_SHOES_NUM_EXIST));
      } else { // 기타면 size는 String
        if (!isNaN(productSize))
          return res.send(errResponse(baseResponse.ORDER_SIZE_ETC_NOT_NUM));

        if (productSize != 'XL' && productSize != 'L' && productSize != 'M' && productSize != 'S')
          return res.send(errResponse(baseResponse.ORDER_SIZE_ETC_EXIST));
      };


      const signUpResponse = await basketService.createBasket(
          userIdx,
          brandName,
          productName,
          productSize,
          productCnt
      );


      return res.send(signUpResponse);
    } else {
      return res.send(errResponse(baseResponse.PRODUCT_NOT_PRODUCT))
    }

    // const userByIdx = await basketProvider.retrieveUser(userIdx);
    //
    // const userId = userByIdx[0].userId;


    // 해당 상품은 없습니다.

    // 빈 값 체크
    // if (!customIdx)
    // return res.send(response(baseResponse.))
    // 길이 체크

    // 형식 체크
  }
};

exports.getBasket = async function (req, res) {
  /**
   * Path Valriable: userIdx
   * **/
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const userIdx = req.params.userIdx;

  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    if (!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const userByBasketList = await basketProvider.retrieveUserBasket(userIdx);
    return res.send(response(baseResponse.SUCCESS, userByBasketList));
  }
};

exports.patchBuyProduct = async function (req, res) {
  /**
   * body: isBuy'
   * **/
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const userIdx = req.params.userIdx;
  const basketIdx = req.params.basketIdx;

  const {isBuy} = req.body;

  if (!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

  if (!basketIdx) return res.send(errResponse(baseResponse.BASKET_IDX_EXIST));

  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {

    const basketStatusResult = await basketProvider.basketStatusCheck(basketIdx);
    console.log(basketStatusResult[0].idx);

    // if (!basketIdx) return

    const editIsBuy = await basketService.editIsBuy(isBuy, userIdx, basketIdx);

    return res.send(editIsBuy);
  }
};

exports.patchDeleteProduct = async function (req, res) {
  /**
   * body: status='DELETE'
   * **/
  const userIdxFromJWT = req.verifiedToken.userIdx;
  const userIdx = req.params.userIdx;
  const basketIdx = req.params.basketIdx;

  const {status} = req.body;

  if (userIdxFromJWT != userIdx) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    if (!userIdx) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    if (!status) return res.send(errResponse(baseResponse.BASKET_STATUS_EMPTY));

    if (status != 'DELETE') return res.send(errResponse(baseResponse.BASKET_STATUS_NOT_VALUE));

    const basketStatusResult = await basketProvider.basketStatusCheck(basketIdx);

    if (basketStatusResult.length == 0)
      return res.send(errResponse(baseResponse.BASKET_IDX_EXIST));

    if (status == basketStatusResult[0].status) { // 이미 해당 장바구니 삭제를 완료했습니다.
      return res.send(errResponse(baseResponse.BASKET_REDUNDANT_STATUS_DELETE));
    } else {

      const editStatus = await basketService.editStatus(status, userIdx, basketIdx);

      return res.send(editStatus);
    }
  }
};