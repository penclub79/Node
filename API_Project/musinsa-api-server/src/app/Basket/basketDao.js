async function insertBasket(connection, inserBasketParams) {
    const insertBasketQuery = `
        INSERT INTO Basket (customIdx, brandIdx, productIdx, productSize, productCnt)
        VALUES (
                       (select idx from Customer where idx=?),
                       (select idx from Brand where brandName=?),
                       (select idx from ProductInfo where productName=?),
                       ?,
                       ?
               );
    `;
    const insertBasketRow = await connection.query(
        insertBasketQuery,
        inserBasketParams
    );
    //test

    return insertBasketRow;
};

async function selectUserIdx(connection, userIdx) {
  const selectUserIdxQuery = `
    SELECT userId FROM Customer WHERE idx = ?;
  `;

  const [userRow] = await connection.query(
      selectUserIdxQuery,
      userIdx
  );

  return userRow;
};

async function selectUserBasket(connection, userIdx) {
  const selectUserBasketQuery = `
      SELECT
          Basket.idx,
          B.brandName,
          PI.productName,
          Basket.productSize,
          PI.price,
          PI.quantity,
          Basket.isBuy,
          Basket.productCnt
      FROM Basket
               LEFT JOIN Customer C on Basket.customIdx = C.idx
               LEFT JOIN ProductInfo PI on Basket.productIdx = PI.idx
               LEFT JOIN Brand B on PI.brandIdx = B.idx
      WHERE C.idx = ? and Basket.status='ACTIVE'
      group by Basket.idx
        order by Basket.idx desc;
  `;
  const [basketRow] = await connection.query(
      selectUserBasketQuery,
      userIdx
  );
  return basketRow;
};

// 사용자가 장바구니 물건 구매
async function updateIsBuy(connection, isBuy, userIdx, basketIdx) {

  const updateIsBuyQuery = `
      UPDATE Basket
      SET isBuy = ?
      WHERE customIdx = ? and idx = ?;
  `;

  const updateIsBuyRow = await connection.query(
      updateIsBuyQuery,
      [isBuy, userIdx, basketIdx]
  );
  return updateIsBuyRow;
};

// 사용자가 장바구니 물건 삭제
async function updateStatus(connection, status, userIdx, basketIdx) {

  const updateStatusQuery = `
    UPDATE Basket
    SET status = ?
    WHERE customIdx = ? and idx = ? and isBasket='N';
  `;

  const updateStatusRow = await connection.query(
      updateStatusQuery,
      [status, userIdx, basketIdx]
  )
  return updateStatusRow[0];
};

async function selectProductInfo(connection, productIdx) {
  const selectProductInfoQuery = `
      select
          ProductInfo.idx,
          C.categoryName,
          ProductInfo.productName,
          (select brandName from Brand where idx = ProductInfo.brandIdx) as brandName
      from ProductInfo
               left join Category C on C.productIdx = ProductInfo.idx
      where ProductInfo.idx = ?;
  `;

  const [selectProductRow] = await connection.query(selectProductInfoQuery, productIdx);
  return selectProductRow;
};

async function selectBasketStatus(connection, basketIdx) {
  const selectBasketStatusQuery = `
    select * from Basket where idx = ?;
  `;

  const [selectBasketStatusRow] = await connection.query(selectBasketStatusQuery, basketIdx);
  return selectBasketStatusRow;
};

module.exports = {
  insertBasket,
  selectUserIdx,
  selectUserBasket,
  updateIsBuy,
  updateStatus,
  selectProductInfo,
  selectBasketStatus
}