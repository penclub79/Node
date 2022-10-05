const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const productProvider = require("./productProvider");
const productDao = require("./productDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

// const {connect} = require("http2");

exports.createProductRegister = async function (brandName, brandImgPath, productName, articleNum, price, menOrWomen, color, quantity, salesRate, categoryName) {
  try {
    const insertBrandParams = [brandName, brandImgPath];
    const connection = await pool.getConnection(async (conn) => conn);
    const brandResult = await productDao.insertBrandInfo(connection, insertBrandParams);
    console.log(brandResult[0].insertId);

    if (brandResult[0].insertId) {
      // 브랜드 등록 -> 브랜드 조회 -> 상품 등록
      const selectBrandIdx = await productDao.selectBrand(connection, brandName);

      const insertProductParams = [selectBrandIdx[0].idx, productName, articleNum, price, menOrWomen, color, quantity, salesRate];
      const productResult = await productDao.insertProductInfo(connection, insertProductParams);

      // 브랜드 등록 -> 브랜드 조회 -> 상품 등록 -> 상품 조회 -> 카테고리 등록
      const selectProductIdx = await productDao.selectProductIdx(connection, productResult[0].insertId);
      console.log('상품 등록 완료');
      if (selectProductIdx[0].idx) {
        const insertCategoryParams = [selectProductIdx[0].idx, categoryName];
        const categoryResult = await productDao.insertCategory(connection, insertCategoryParams);
      } else {
        console.log('상품 없음')
        return errResponse(response(baseResponse.PRODUCT_NOT_PRODUCT));
      }
    } else {
      console.log('브랜드 없음')
      return errResponse(response(baseResponse.PRODUCT_NOT_BRAND));
    }
    // // 위 등록된 브랜드 idx로 브랜드 이름 조회
    return response(baseResponse.PRODUCT_REGISTER_SUCCESS);

  } catch (err) {
    logger.error(`App - createProductRegister Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

// exports.createBrand = async function (brandName) {
//
//   try {
//
//     const insertBrandInfoParams = [brandName];
//
//     const connection = await pool.getConnection(async (conn) => conn);
//     const brandResult = await productDao.insertBrandInfo(connection, insertBrandInfoParams);
//     console.log(JSON.stringify(brandResult[0]));
//     console.log(`추가된 브랜드 idx : ${brandResult[0].insertId}`);
//     connection.release();
//     return response(baseResponse.SUCCESS);
//
//   } catch (err) {
//     logger.error(`App - createBrand Service error\n: ${err.message}`);
//     return errResponse(baseResponse.DB_ERROR);
//   }
// };

// exports.createProduct = async function (brandName, productName, articleNum, price, menOrWomen, color, quantity, salesRate) {
//   try {
//
//     // 브랜드 등록 여부
//     const brandRow = await productProvider.brandCheck(brandName);
//     if (brandRow.length < 1) return errResponse(baseResponse.PRODUCT_NOT_BRAND);
//
//     // body 삽입
//     const insertProductInfoParams = [
//       brandName,
//       productName,
//       articleNum,
//       price,
//       menOrWomen,
//       color,
//       quantity,
//       salesRate
//     ];
//
//     const connection = await pool.getConnection(async (conn) => conn);
//     // 상품 생성
//     const productResult = await productDao.insertProductInfo(connection, insertProductInfoParams);
//     console.log(`추가된 상품 idx : ${productResult[0].insertId}`);
//     connection.release();
//     return response(baseResponse.SUCCESS);
//
//   } catch (err) {
//     logger.error(`App - createProduct Service error\n: ${err.message}`);
//     return errResponse(baseResponse.DB_ERROR);
//   }
// };

exports.createTag = async function (productIdx, productTag) {
  try {
    // 해당 상품 등록여부 체크
    const productRow = await productProvider.productIdxCheck(productIdx);
    if (productRow.length < 1)
      return errResponse(baseResponse.PRODUCT_NOT_PRODUCT);

    // 해당 태그 등록여부 체크
    const productTagRow = await productProvider.tagNameCheck(productTag);
    if (productTagRow.length < 1) {
      // 태그 중복여부 체크
      const insertTagParams = [productIdx, productTag];

      const connection = await pool.getConnection(async (conn) => conn);
      const tagResult = await productDao.insertTag(connection, insertTagParams);
      console.log(`추가된 태그 idx : ${tagResult[0].insertId}`);
      connection.release();
      return response(baseResponse.SUCCESS);
    } else {
      if (productTagRow[0].productTag == productTag)  // 중복 체크
        return errResponse(baseResponse.PRODUCT_REDUNDANT_TAG);
    }

  } catch (err) {
    logger.error(`App - createTag Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

// exports.createCategory = async function (productIdx, categoryName, tagIdx) {
//   try {
//     const insertCategoryParams = [productIdx, categoryName, tagIdx];
//
//     const connection = await pool.getConnection(async (conn) => conn);
//     const categoryResult = await productDao.insertCategory(connection, insertCategoryParams);
//     console.log(`추가된 카테고리 idx : ${categoryResult[0].insertId}`);
//     connection.release();
//     return response(baseResponse.SUCCESS);
//
//   } catch (err) {
//     logger.error(`App - createCategory Service error\n: ${err.message}`);
//     return errResponse(baseResponse.DB_ERROR);
//   }
// };

exports.editStatus = async function (status, productIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const editStatusResult = await productDao.updateStatus(connection, status, productIdx);
    connection.release();

    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - editStatus Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
}