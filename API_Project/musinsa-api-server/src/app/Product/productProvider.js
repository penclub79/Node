const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const productDao = require("./productDao");

exports.retrieveProductList = async function (productName) {
  // 상품명이 없을 경우 상품 전체조회
  if (!productName) {
    const row = [];
    const connection = await pool.getConnection(async (conn) => conn);
    const productListResult = await productDao.selectProductList(connection);

    const productImgList = await Promise.all(productListResult.map(productListResult => {
      return productDao.selectProductImg(connection, productListResult.productName);
    }));

    connection.release();
    return productListResult;

  } else { // 상품명이 있는 경우 해당 상품 조회
    const row = [];
    const connection = await pool.getConnection(async (conn) => conn);
    const productImgList = await productDao.selectProductImg(connection, productName);
    for (i = 0; i < productImgList.length; i++){
      row.push(productImgList[i].imgPath);
    }
  // 1. imgPath를 검색한다. 2. imgPath 키값에 배열로 값을 넣는다.
    const productListResult = await productDao.selectProductName(connection, productName);
    for (i = 0; i < productListResult.length; i++){
      productListResult[i].imgPath = row
    }

    connection.release();

    return productListResult;
  }
}

exports.productIdxCheck = async function (productIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const productIdxResult = await productDao.selectProductIdx(connection, productIdx);
  connection.release();

  return productIdxResult;
};

// brandName으로 브랜드 검색
exports.brandCheck = async function (brandName) {
  const connection = await pool.getConnection(async (conn) => conn);
  const brandResult = await productDao.selectBrand(connection, brandName);
  connection.release();

  return brandResult;
};

exports.brandIdxCheck = async function (brandIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const brandIdxResult = await productDao.selectBrandIdx(connection, brandIdx);
  connection.release();

  return brandIdxResult;
};

// productTag로 태그명 검색
exports.tagNameCheck = async function (productTag) {
  const connection = await pool.getConnection(async (conn) => conn);
  const tagNameResult = await productDao.selectTagName(connection, productTag);
  connection.release();

  return tagNameResult;
}