async function selectCategory(connection, categoryName) {
  const selectCategoryQuery = `
    select
       categoryName,
       count(Category.productIdx) as productCount
    from Category
    LEFT JOIN ProductInfo PI on Category.productIdx = PI.idx
    WHERE categoryName=?;
  `;

  const [categoryRow] = await connection.query(selectCategoryQuery, categoryName);
  return categoryRow;
};

async function selectCategoryTotal(connection) {
  const selectCategoryTotalQuery = `
    select
       categoryName,
       count(Category.productIdx) as productCount
    from Category
    LEFT JOIN ProductInfo PI on Category.productIdx = PI.idx
    group by categoryName;
  `;

  const [categoryTotalRow] = await connection.query(selectCategoryTotalQuery);
  return categoryTotalRow;
}

async function updateStatus(connection, status, categoryIdx) {
  const updateStatusQuery = `
    UPDATE Category
        SET status = ?
        WHERE idx = ? and status='ACTIVE';
  `;

  const updateStatusRow = await connection.query(updateStatusQuery, [status, categoryIdx]);
  return updateStatusRow;
}

module.exports = {
  selectCategory,
  selectCategoryTotal,
  updateStatus
};