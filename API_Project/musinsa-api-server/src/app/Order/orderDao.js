// 주문 등록
async function insertOrderInfo(connection, insertOrderInfoParams) {
  const insertOrderInfoQuery = `
      insert into ProductOrder (customIdx, productIdx, productSize, orderNum, deliveryMessage, orderPrice)
      VALUES (
             (select idx from Customer where idx=?),
             (select idx from ProductInfo where productName=?),
             ?, ?, ?, ?);
  `;

  const insertOrderInfoRow = await connection.query(
      insertOrderInfoQuery,
      insertOrderInfoParams
  );

  return insertOrderInfoRow;
};

// 주문 조회 - 유저ID
async function selectOrderByUserId(connection, userIdx){

  const selectOrderByUserIdQuery = `
      select
       C.name,
       C.phone,
       R.recipientAddressName,
       R.recipientAddress,
       deliveryMessage,
       P.imgPath,
       PI.productName,
       PI.price
        from ProductOrder
        LEFT JOIN Customer C on C.idx = ProductOrder.customIdx 
        LEFT JOIN Recipient R on C.idx = R.customIdx 
        LEFT JOIN ProductInfo PI on ProductOrder.productIdx = PI.idx 
        LEFT JOIN ProductImg P on PI.idx = P.productIdx 
        where ProductOrder.customIdx = ?
        group by ProductOrder.idx;
  `;
  const [orderRow] = await connection.query(selectOrderByUserIdQuery, userIdx);
  return orderRow;
};

async function selectOrderPriceTotal (connection, userIdx) {
    const selectOrderPriceTotalQuery = `
      select
        SUM(orderPrice) as totalPrice
        from ProductOrder
        LEFT JOIN Customer C on C.idx = ProductOrder.customIdx 
        LEFT JOIN Recipient R on C.idx = R.customIdx 
        LEFT JOIN ProductInfo PI on ProductOrder.productIdx = PI.idx 
        LEFT JOIN ProductImg P on PI.idx = P.productIdx 
        where ProductOrder.customIdx = ?;
    `;

    const [totalPriceRow] = await connection.query(selectOrderPriceTotalQuery, userIdx);
    return totalPriceRow;
};

async function selectProductSize (connection, productName) {
  const selectProductSizeQuery = `
      select
          categoryName
      from Category
      left join ProductInfo PI on productIdx = PI.idx
      where productName = ?
      group by categoryName;
  `;

  const [categoryTypeResult] = await connection.query(selectProductSizeQuery, productName)
  return categoryTypeResult;
};

// 상품 세일 조회
async function selectProductSale (connection, productName) {
  const selectProductSaleQuery = `
    select price, salesRate from ProductInfo where productName = ?;
  `;
  const [saleProductResult] = await connection.query(selectProductSaleQuery, productName);
  return saleProductResult;
};

// 유저 쿠폰 조회
async function selectUserCoupon (connection, userIdx) {
  const selectUserCouponQuery = `
    select idx, customIdx, couponDiscount, couponRange, couponStatus
    from CouponPost
    where customIdx = ? and couponStatus = 'N';
  `;
  const [userCouponResult] = await connection.query(selectUserCouponQuery, userIdx);
  return userCouponResult;
};

// 유저 적립금 조회
async function selectUserReserve (connection, userIdx) {
  const selectUserReserveQuery = `
    select point, reserves, gradeDiscount from MemberBenefit where customIdx = ?;
  `;
  const [userReserveResult] = await connection.query(selectUserReserveQuery, userIdx);
  return userReserveResult;
};

// 쿠폰 사용시 쿠폰 정보 수정
async function updateCouponInfo (connection, productName, couponIdx) {
  console.log(productName, couponIdx);
  const updateCouponInfoQuery = `
      UPDATE CouponPost
      SET
          productIdx = (select idx from ProductInfo where productName = ?),
          couponStatus = 'Y'
      where idx = ?;
  `;
  const updateCouponInfoRow = await connection.query(updateCouponInfoQuery, [productName, couponIdx]);
  return updateCouponInfoRow;
};

module.exports = {
  insertOrderInfo,
  selectOrderByUserId,
  selectOrderPriceTotal,
  selectProductSize,
  selectProductSale,
  selectUserCoupon,
  selectUserReserve,
  updateCouponInfo
};