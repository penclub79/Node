async function selectTagProduct(connection, productTag) {
  const selectTagProductQuery = `
      select CONCAT('#', Tag.productTag)                                  as tag,
             P.imgPath                                                    as productImg,
             categoryName                                                 as category,
             brandName,
             productName,
             (select IF(Review.customIdx = PI.idx, AVG(rating), 0)
              from Review)                                                as avgRating,
             (select IF(Review.customIdx = PI.idx, count(Review.customIdx), 0)
              from Review)                                                as reviewCount,
             price,
             PP.issueType                                                 as issue,
             (select IF(LK.productIdx = PI.idx, count(LK.productIdx), 0)) as viewCount,
             (select IF(PI.idx = ProductOrder.productIdx, sum(orderNum), 0)
              from ProductOrder)                                          as sellCount,
             CONCAT(articleNum, '/', brandName)                           as articleAndBrand,
             menOrWomen                                                   as gender
      from Tag
               LEFT JOIN ProductInfo PI on Tag.productIdx = PI.idx
               LEFT JOIN ProductImg P on PI.idx = P.productIdx
               LEFT JOIN Brand B on PI.brandIdx = B.idx
               LEFT JOIN Category C on PI.idx = C.productIdx
               LEFT JOIN SaleInfo PP on PI.idx = PP.productIdx
               LEFT JOIN \`Like\` LP on PI.idx = LP.productIdx
               LEFT JOIN Lookup LK on PI.idx = LK.productIdx
      WHERE Tag.productTag = ? and Tag.status='ACTIVE';
  `;
  const [tagProductRow] = await connection.query(selectTagProductQuery, productTag);
  return tagProductRow;
};

async function updateStatus(connection, status, tagIdx) {
  const updateStautsQuery = `
      UPDATE Tag
        SET status = ?
        WHERE idx = ?;
  `;

  const updateStatusRow = connection.query(updateStautsQuery, [status, tagIdx]);

  return updateStatusRow[0];
};

module.exports = {
  selectTagProduct,
  updateStatus,
};