// 좋아요 상품 찾기
async function selectUserId(connection, userIdx) {
  const selectUserProductLikeQuery = `
      select
       C.userId,
       (select count(\`Like\`.idx) from \`Like\` ) as likeProductCount,
       PI.imgPath as img,
       productName,
       B.brandName,
       price,
       if(isLikeProduct='Y', COUNT(L.productIdx=PI.productIdx),0) as likeCount,
       SI.isDiscount,
       SI.issueType,
       SI.isSale 
        from ProductInfo
        left join \`Like\` L on L.productIdx = ProductInfo.idx
        left join ProductImg PI on ProductInfo.idx = PI.productIdx
        left join Brand B on ProductInfo.brandIdx = B.idx
        left join SaleInfo SI on ProductInfo.idx = SI.productIdx
        right join Customer C on L.customIdx = C.idx
        where L.isLikeProduct like 'Y' and customIdx=?
        group by productName;
  `;
  const [likeProductRow] = await connection.query(
      selectUserProductLikeQuery,
      userIdx
  );

  return likeProductRow;
}

// 좋아요 브랜드 찾기
async function selectUserIdByBrand(connection, userIdx) {
  const selectUserBrandLikeQuery = `
      select C.userId,
             (select count(\`Like\`.brandIdx) from \`Like\`)               as likeBrandCount,
             B.imgPath                                                     as img,
             B.brandName,
             price,
             if(isLikeBrand = 'Y', COUNT(L.productIdx = PI.productIdx),
                0)                                                         as likeCount,
             SI.isDiscount,
             SI.issueType,
             SI.isSale                                                     
      from ProductInfo
          left join \`Like\` L
      on L.productIdx = ProductInfo.idx
          left join ProductImg PI on ProductInfo.idx = PI.productIdx
          left join Brand B on ProductInfo.brandIdx = B.idx
          left join SaleInfo SI on ProductInfo.idx = SI.productIdx
          right join Customer C on L.customIdx = C.idx
      where L.isLikeBrand like 'Y' and customIdx=?
      group by brandName;
  `;
  const [likeBrandRow] = await connection.query(
      selectUserBrandLikeQuery,
      userIdx
  );

  return likeBrandRow;
};

async function updateLikeProduct(connection, isLikeProduct, userIdx, productIdx) {
  const updateLikeProductQuery = `
      UPDATE \`Like\`
      SET isLikeProduct = ?
      WHERE customIdx = ?
        and productIdx = ?;
  `;

  const updateLikeProductRow = await connection.query(updateLikeProductQuery, [isLikeProduct, userIdx, productIdx]);
  return updateLikeProductRow;
};

async function selectLikeIdx(connection, productIdx) {
  const selectLikeIdxQuery = `
      select * from \`Like\` where productIdx = ?;
  `;

  const [selectLikeRow] = await connection.query(selectLikeIdxQuery, productIdx);
  return selectLikeRow;
}

async function insertLikeProduct(connection, insertLikeParams) {
  const insertLikeProductQuery = `
    insert into \`Like\` (isLikeProduct, customIdx, productIdx)
    values (
            ?, ?, ?
           );
  `;

  const insertLikeRow = await connection.query(insertLikeProductQuery, insertLikeParams);
  return insertLikeRow;
}

module.exports = {
  selectUserId,
  selectUserIdByBrand,
  updateLikeProduct,
  selectLikeIdx,
  insertLikeProduct
};