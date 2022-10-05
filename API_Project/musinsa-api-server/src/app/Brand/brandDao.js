async function selectBrand(connection) {
  const selectBrandListQuery = `
    select
        imgPath,
       brandName,
       count(PI.productName) as productCount
    from Brand
    RIGHT JOIN ProductInfo PI on PI.brandIdx = Brand.idx
    where Brand.status='ACTIVE'
    group by brandName;
  `;

  const [brandListRow] = await connection.query(selectBrandListQuery);
  return brandListRow;
};

async function selectBrandName(connection, brandName) {
  const selectBrandNameQuery = `
    select
        imgPath,
       brandName,
       count(PI.productName) as productCount
    from Brand
    RIGHT JOIN ProductInfo PI on PI.brandIdx = Brand.idx
    where brandName = ? and Brand.status='ACTIVE'
    group by brandName;
  `;

  const [brandNameRow] = await connection.query(selectBrandNameQuery, brandName);
  return brandNameRow;
}

async function updateStatus(connection, status, brandIdx) {
  const updateStatusQuery = `
    UPDATE Brand
    SET status = ?
    WHERE idx = ?;
  `;

  const updateStatusRow = connection.query(updateStatusQuery, [status, brandIdx]);

  return updateStatusRow[0];
};

module.exports = {
  selectBrand,
  selectBrandName,
  updateStatus,
}