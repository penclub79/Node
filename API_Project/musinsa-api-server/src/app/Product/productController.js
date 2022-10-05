const productProvider = require("../../app/Product/productProvider");
const productService = require("../../app/Product/productService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

exports.postProductRegister = async function (req, res) {
  const {
    brandName,
    brandImgPath,
    productName,
    articleNum,
    price,
    menOrWomen,
    color,
    quantity,
    salesRate,
    categoryName
  } = req.body;
  // 브랜드이름 빈 값 체크
  if (!brandName)
    return res.send(response(baseResponse.BRAND_VALUE_EMPTY));
  // 상품명 빈 값 체크
  if (!productName)
    return res.send(response(baseResponse.PRODUCT_VALUE_EMPTY));
  // 상품명 String 형식 체크
  if (isNaN(productName) === false)  //상품명 숫자 여부
    return res.send(response(baseResponse.PRODUCT_VALUE_NOT_NUM));
  // 상품코드 빈 값 체크
  if (!articleNum)
    return res.send(response(baseResponse.PRODUCT_ARTICLE_NUM_EMPTY));
  // 상품코드 int 형식 체크
  if (isNaN(articleNum) === true)  //상품코드 문자 여부
    return res.send(response(baseResponse.PRODUCT_ARTICLE_NOT_CHAR));
  // 가격 빈 값 체크
  if (!price)
    return res.send(response(baseResponse.PRODUCT_PRICE_EMPTY));
  // 가격 int 형식 값 체크
  if (isNaN(price) === true)  //상품코드 문자 여부
    return res.send(response(baseResponse.PRODUCT_PRICE_NOT_CHAR));
  // 성별 빈 값 체크
  if (!menOrWomen)
    return res.send(response(baseResponse.PRODUCT_GENDER_EMPTY));
  // 성별 폼 값 체크
  if (menOrWomen != 'M' && menOrWomen != 'F' && menOrWomen != 'W')
    return res.send(response(baseResponse.PRODUCT_GENDER_ERROR_TYPE));
  // 컬러 빈 값 체크
  if (!color)
    return res.send(response(baseResponse.PRODUCT_COLOR_EMPTY));
  // 수량 빈 값 체크
  if (!quantity)
    return res.send(response(baseResponse.PRODUCT_QUANTITY_EMPTY));
  // 카테고리 빈 값 체크
  if (!categoryName)
    return res.send(response(baseResponse.PRODUCT_CATEGORY_EMPTY));

  const registerProduct = await productService.createProductRegister(
      brandName,
      brandImgPath,
      productName,
      articleNum,
      price,
      menOrWomen,
      color,
      quantity,
      salesRate,
      categoryName
  );

  return res.send(registerProduct);
};

/** No.1 상품 등록 - 브랜드 **/
// exports.postBrand = async function (req, res) {
//   // Body : brandName
//   const {brandName} = req.body;
//
//
//   const registerBrand = await productService.createBrand(
//       brandName
//   );
//
//   return res.send(registerBrand);
// };

/** No.1 상품 등록 - 상품 **/
// exports.postProduct = async function (req, res) {
//   /** Body : brandIdx, productName, articleNum, price, menOrWomen, color,
//               quantity, salesRate **/
//   const
//   {
//     brandName,
//     productName,
//     articleNum,
//     price,
//     menOrWomen,
//     color,
//     quantity,
//     salesRate
//   } = req.body;
//
//   if (!brandName)
//     return res.send(response(baseResponse.PRODUCT_BRAND_VALUE_EMPTY));


  // if (isNaN(price) === true)  //가격 문자 여부
  //   return res.send(response(baseResponse.PRODUCT_ARTICLE_NOT_CHAR));
  //
  // if (isNaN(articleNum) === true)  //상품코드 문자 여부
  //   return res.send(response(baseResponse.PRODUCT_ARTICLE_NOT_CHAR));
  //
  // if (isNaN(articleNum) === true)  //상품코드 문자 여부
  //   return res.send(response(baseResponse.PRODUCT_ARTICLE_NOT_CHAR));
  //
  // if (isNaN(articleNum) === true)  //상품코드 문자 여부
  //   return res.send(response(baseResponse.PRODUCT_ARTICLE_NOT_CHAR));
  //
  // if (isNaN(articleNum) === true)  //상품코드 문자 여부
  //   return res.send(response(baseResponse.PRODUCT_ARTICLE_NOT_CHAR));
  //
  // if (isNaN(articleNum) === true)  //상품코드 문자 여부
  //   return res.send(response(baseResponse.PRODUCT_ARTICLE_NOT_CHAR));

//   const registerProduct = await productService.createProduct(
//      brandName,
//      productName,
//      articleNum,
//      price,
//      menOrWomen,
//      color,
//      quantity,
//      salesRate
//   );
//
//   return res.send(registerProduct);
// };

/** No.1 상품 등록 - 태그 **/
exports.postTag = async function (req, res) {
  /**
   * Path Variable : productIdx
   * Body : productTag
   */
  const productIdx = req.params.productIdx;
  const {productTag} = req.body;
  const registerTag = await productService.createTag(productIdx, productTag);

  return res.send(registerTag);
};

/** No.1 상품 등록 - 카테고리 **/
// exports.postCategory = async function (req, res) {
//   /** Body : productIdx, categoryName, tagIdx
//    */
//   const {productIdx, categoryName, tagIdx} = req.body
//   const registerCategory = await productService.createCategory(productIdx, categoryName, tagIdx);
//
//   return res.send(registerCategory);
// }

/** No.1 상품 등록 - 이미지 **/


/** No.2 상품 조회 **/
exports.getProducts = async function (req, res) {
  /** Query String : productName
   */
  const productName = req.query.name;

  if (!productName) {
    // 상품 전체 조회
    const productListResult = await productProvider.retrieveProductList();
    return res.send(response(baseResponse.SUCCESS, productListResult));
  } else {
    // 상품명 조회
    const productListByProductName = await productProvider.retrieveProductList(productName);
    return res.send(response(baseResponse.SUCCESS, productListByProductName));
  }
}

exports.patchDeleteProduct = async function (req, res) {
  /**
   * Path Variable : productIdx
   * body: status
   */
  const productIdx = req.params.productIdx;
  const {status} = req.body;

  if (!productIdx) return res.send(errResponse(baseResponse.PRODUCT_IDX_EMPTY));

  const editStatus = await productService.editStatus(status, productIdx);

  return res.send(editStatus);
};