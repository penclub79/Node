async function selectCouponName(connection, couponName) {
  const selectCouponNameQuery = `
    SELECT couponName
    FROM CouponPost
    WHERE couponName = ?;
  `;

  const [couponNameRows] = await connection.query(
      selectCouponNameQuery,
      couponName
  );
  return couponNameRows;
}

async function insertCoupon(connection, insertCouponParams){
  const insertCouponQuery = `
    INSERT INTO CouponPost(couponName,
                           couponDiscount,
                           couponRange,
                           couponStatus,
                           startTime,
                           endTime,
                           couponImgPath)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  const insertCouponRow = await connection.query(
      insertCouponQuery,
      insertCouponParams
  );

  return insertCouponRow;
};

// userIdx로 쿠폰 조회
async function selectCouponList(connection, userIdx) {
  const selectCouponListQuery = `
    SELECT
       C.userId,
       couponImgPath,
       couponName,
       couponDiscount,
       couponRange,
       startTime,
       endTime
    FROM CouponPost
    LEFT JOIN Customer C on CouponPost.customIdx = C.idx
    WHERE C.idx = ? and couponStatus='N';
  `;
  const [couponRow] = await connection.query(selectCouponListQuery, userIdx);
  return couponRow;
}



module.exports = {
  selectCouponName,
  insertCoupon,
  selectCouponList
}