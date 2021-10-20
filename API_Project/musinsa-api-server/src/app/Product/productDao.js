
// 브랜드 생성 쿼리
async function insertBrandInfo(connection, insertBrandInfoParams) {
  const insertBrandInfoQuery = `
      INSERT INTO Brand (brandName, brandImgPath)
      VALUES (?, ?);
  `;

  const insertBrandInfoRow = await connection.query(
      insertBrandInfoQuery,
      insertBrandInfoParams
  );

  return insertBrandInfoRow;
}

// 상품상세 생성 쿼리
async function insertProductInfo(connection, insertProductInfoParams) {
  console.log(insertProductInfoParams);
  const insertProductInfoQuery = `
      INSERT INTO ProductInfo (brandIdx, productName, articleNum, price, menOrWomen, color, quantity, salesRate)
      VALUES (
                     (select idx from Brand where idx=?),
                     ?,?,?,?,?,?,?
             );
  `;

  const insertProductInfoRow = await connection.query(
      insertProductInfoQuery,
      insertProductInfoParams
  );

  return insertProductInfoRow;
}

// 태그 생성 쿼리
async function insertTag(connection, insertTagParams) {
  const insertTagQuery = `
      INSERT INTO Tag (productIdx, productTag)
      VALUES (
                     (select idx from ProductInfo where idx=?),
                     ?
             );
  `;

  const insertTagRow = await connection.query(
      insertTagQuery,
      insertTagParams
  );

  return insertTagRow;
}

// 카테고리 생성 쿼리
async function insertCategory(connection, insertCategoryParams) {
  const insertCategoryQuery = `
      INSERT INTO Category (productIdx, categoryName)
      VALUES (
                 (select idx from ProductInfo where idx=?),
              ?
              );
  `;

  const insertCategoryRow = await connection.query(
      insertCategoryQuery,
      insertCategoryParams
  );

  return insertCategoryRow;
}

// 상품 전체 조회
async function selectProductList(connection) {
  const selectProductListQuery = `
        select
        PI.imgPath,
        CONCAT(categoryName,'(',brandName,')') as productInfo,
        productName,
        (select IF(Review.customIdx = ProductInfo.idx, AVG(rating), 0) from Review) as avgRating,
        (select IF(Review.customIdx = ProductInfo.idx, count(Review.customIdx), 0) from Review) as reviewCount,
        price,
        PP.issueType,
        (select IF(LK.productIdx = ProductInfo.idx , count(LK.productIdx), 0)) as viewCount, 
        (select IF(ProductInfo.idx = ProductOrder.productIdx, sum(orderNum), 0) from ProductOrder) as sellCount, 
        CONCAT(articleNum,'/',brandName) as articleAndBrand,
        menOrWomen,
        CONCAT('#',T.productTag) as tag
        from ProductInfo
        LEFT JOIN ProductImg PI on ProductInfo.idx = PI.productIdx
        LEFT JOIN Brand B on ProductInfo.brandIdx = B.idx
        LEFT JOIN Category C on ProductInfo.idx = C.productIdx 
        LEFT JOIN SaleInfo PP on ProductInfo.idx = PP.productIdx 
        LEFT JOIN \`Like\` LP on ProductInfo.idx = LP.productIdx 
        LEFT JOIN Lookup LK on ProductInfo.idx = LK.productIdx 
        LEFT JOIN Tag T on ProductInfo.idx = T.productIdx
        where B.status = 'ACTIVE' and C.status = 'ACTIVE'
        group by productName;
  `;
  const [productRows] = await connection.query(selectProductListQuery);
  return productRows;
}

// 해당 상품명 조회
async function selectProductName(connection, productName) {
  const selectProductNameQuery = `
        select
        PI.imgPath,
        CONCAT(categoryName,'(',brandName,')') as productInfo,
        productName,
        (select IF(Review.customIdx = ProductInfo.idx, AVG(rating), 0) from Review) as avgRating ,
        (select IF(Review.customIdx = ProductInfo.idx, count(Review.customIdx), 0) from Review) as reviewCount,
        price,
        PP.issueType,
        (select IF(LK.productIdx = ProductInfo.idx , count(LK.productIdx), 0)) as viewCount,
        (select IF(ProductInfo.idx = ProductOrder.productIdx, sum(orderNum), 0) from ProductOrder) as sellCount, 
        CONCAT(articleNum,'/',brandName) as articleAndBrand,
        menOrWomen,
        CONCAT('#',T.productTag)
        from ProductInfo
        LEFT JOIN ProductImg PI on ProductInfo.idx = PI.productIdx
        LEFT JOIN Brand B on ProductInfo.brandIdx = B.idx 
        LEFT JOIN Category C on ProductInfo.idx = C.productIdx
        LEFT JOIN SaleInfo PP on ProductInfo.idx = PP.productIdx
        LEFT JOIN \`Like\` LP on ProductInfo.idx = LP.productIdx
        LEFT JOIN Lookup LK on ProductInfo.idx = LK.productIdx
        LEFT JOIN Tag T on ProductInfo.idx = T.productIdx
        where productName = ? and B.status = 'ACTIVE' and C.status = 'ACTIVE'
        group by productName;
  `;

  const [productNameRow] = await connection.query(selectProductNameQuery, productName);
  return productNameRow;
};

async function selectProductIdx(connection, productIdx) {
  const selectProductIdxQuery = `
     SELECT idx FROM ProductInfo WHERE idx = ?;
  `;
  const [productIdxRow] = await connection.query(selectProductIdxQuery, productIdx);
  return productIdxRow;
};

async function selectBrand(connection, brandName) {
  const selectBrandIdxQuery = `
      select idx from Brand where brandName=?;
  `;
  const [brandRow] = await connection.query(selectBrandIdxQuery, brandName);
  return brandRow;
};

async function selectBrandIdx(connection, brandIdx) {
  const selectBrandIdxQuery = `
    select idx from Brand where idx = ?;
  `;
  const [brandNameRows] = await connection.query(selectBrandIdxQuery, brandIdx);
  return brandNameRows;
};

async function selectTagName(connection, productTag) {
  const selectTagNameQuery = `
      select * from Tag where productTag=?;
  `;
  const [TagNameRow] = await connection.query(selectTagNameQuery, productTag);
  return TagNameRow;
};

async function selectProductImg(connection, productName) {
  const selectProductImgQuery = `
    select
        imgPath
    from ProductImg
    RIGHT JOIN ProductInfo PI on ProductImg.productIdx = PI.idx
    where productName=?; 
  `;
  const [productImgRow] = await connection.query(selectProductImgQuery, productName);
  return productImgRow;
};

async function updateStatus(connection, status, productIdx) {
  const updateStatusQuery = `
    UPDATE ProductInfo
    SET status = ?
    WHERE idx = ?;
  `;
  const updateStatusRow = connection.query(updateStatusQuery, [status, productIdx]);

  return updateStatusRow[0];
};

module.exports = {
  insertBrandInfo,
  insertProductInfo,
  insertTag,
  insertCategory,
  selectProductList,
  selectProductName,
  selectProductIdx,
  selectBrand, // 브랜드 체크
  selectBrandIdx,
  selectTagName, //태그 체크
  selectProductImg, // 이미지 조회 -> product img 배열 삽입을 위함
  updateStatus,
};