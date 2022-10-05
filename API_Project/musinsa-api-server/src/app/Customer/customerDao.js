// 회원 가입(생성)
async function insertCustomer(connection, insertCustomerParams) {
  console.log("customerDAO");
  const insertCustomerQuery = `
      INSERT INTO musinsaV4.Customer(userId, password, name, nickName, email, phone)
        VALUES (?, ?, ?, ?, ?, ?);
        `;
  const insertCustomerRow = await connection.query(
      insertCustomerQuery,
      insertCustomerParams
  );
  console.log(insertCustomerRow,'쿼리문');

  return insertCustomerRow;
};

// 모든 Customer테이블의 회원 조회
async function selectCustomer(connection){
  const selectCustomerListQuery = `
      SELECT * FROM Customer group by userId;
            `;
  const [customerRows] = await connection.query(selectCustomerListQuery);
  return customerRows;
};

// 아이디로 회원 조회
async function selectCustomerUserId(connection, userId) {
  const selectCustomerUserIdQuery = `
      SELECT userId,
             nickName,
             Customer.createAt                       as createDate,
             IF(isnull(ROUND(sum(price) / 10 + point)), 0,
                ROUND(sum(price) / 10 + point))      as score,
             case
                 when isnull((sum(price) / 10 + point)) then 'newbie'
                 when (sum(price) / 10 + point) between 0 and 2000
                     then 'newbie'
                 when (sum(price) / 10 + point) between 2001 and 10000
                     then 'rookie'
                 when (sum(price) / 10 + point) between 10001 and 100000
                     then 'member'
                 when (sum(price) / 10 + point) between 100001 and 200000
                     then 'bronze'
                 when (sum(price) / 10 + point) between 200001 and 500000
                     then 'silver'
                 when (sum(price) / 10 + point) between 500001 and 1000000
                     then 'gold'
                 when (sum(price) / 10 + point) between 1000001 and 2000000
                     then 'platinum'
                 when 2000001 < (sum(price) / 10 + point) then 'diamond'
                 end                                 as level,
             IF(gender = 'M', 'men', 'women')        as gender,
             IF(isnull(MB.reserves), 0, MB.reserves) as reserves,
             IF(isnull(MB.point), 0, MB.point)       as point,
             (select IF(CouponPost.customIdx = Customer.idx,
                        COUNT(CouponPost.customIdx), 0)
              from CouponPost)                       as coupon,
             (select IF(Review.customIdx = Customer.idx,
                        COUNT(Review.customIdx), 0)
              from Review)                           as review,
             (select COUNT(deliveryStatus)
              from Delivery
              where deliveryStatus like 'PAYMENT')   as payment,
             (select COUNT(deliveryStatus)
              from Delivery
              where deliveryStatus like 'DELIVERY')  as delivery,
             (select COUNT(deliveryStatus)
              from Delivery
              where deliveryStatus like 'SUCCESS')   as success,
             (select COUNT(deliveryStatus)
              from Delivery
              where deliveryStatus like 'CHECK')     as \`check\`
      FROM Customer
               LEFT JOIN MemberBenefit MB on Customer.idx = MB.idx
               LEFT JOIN Delivery D on Customer.idx = D.customIdx
               LEFT JOIN ProductOrder PO on D.orderIdx = PO.idx
               LEFT JOIN ProductInfo PI on PO.productIdx = PI.idx
      WHERE userId = ?
  `;
  const [userIdRows] = await connection.query(selectCustomerUserIdQuery, userId);
  return userIdRows;
};

// 이메일 조회(중복체크)
async function selectCustomerEmail(connection, email) {
  const selectCustomerEmailQuery = `
      SELECT email
      FROM Customer
      WHERE email = ?;
  `;
  const [emailRows] = await connection.query(selectCustomerEmailQuery, email);
  return emailRows;
};

// 패스워드 체크
async function selectCustomerPassword(connection, selectCustomerPasswordParams) {
  const selectCustomerPasswordQuery = `
        SELECT email, nickname, password, userId
        FROM Customer 
        WHERE userId = ? AND password = ?;
        `;
  const selectCustomerPasswordRow = await connection.query(
      selectCustomerPasswordQuery,
      selectCustomerPasswordParams
  );

  return selectCustomerPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectCustomerAccount(connection, userId) {
  const selectCustomerAccountQuery = `
        SELECT idx, userId, status 
        FROM Customer 
        WHERE userId = ?;`;
  const selectCustomerAccountRow = await connection.query(
      selectCustomerAccountQuery,
      userId
  );
  return selectCustomerAccountRow[0];
};

// 유저 닉네임 검색
async function selectCustomerNickName(connection, nickName) {
  const selectNickNameQuery = `
    SELECT nickName
    FROM Customer
    WHERE nickName = ?;
  `;
  const [selectCustomerNickNameRow] = await connection.query(
      selectNickNameQuery,
      nickName
  );
  return selectCustomerNickNameRow;
};

// 등록한 배송지 조회
async function selectCustomerRecipient(connection, userIdx) {
  const selectRecipientQuery = `
    SELECT * FROM Recipient WHERE customIdx = ?;
  `;
  const [selectCustomerRecipientRow] = await connection.query(
      selectRecipientQuery,
      userIdx
  );
  return selectCustomerRecipientRow;
}

async function updateCustomerInfo(connection, nickName, profileUrl, password, email, phone, recipientIdx, height, weight, userIdx) {

  const updateCustomerInfoQuery = `
      UPDATE Customer
      SET nickName = ?,
          profileUrl = ?,
          password = ?,
          email = ?,
          phone = ?,
          recipientIdx =?,
          height =?,
          weight = ?
      WHERE idx = ?;
  `
  const updateCustomerRow = await connection.query(updateCustomerInfoQuery, [nickName, profileUrl, password, email, phone, recipientIdx, height, weight, userIdx]);
  return updateCustomerRow;
};

async function updateStatus(connection, status, userIdx) {
  const updateStatusQuery = `
    UPDATE Customer
        SET status = ?
        WHERE idx = ?;
  `;

  const updateStatusRow = await connection.query(updateStatusQuery, [status, userIdx]);
  return updateStatusRow;
};

module.exports = {
  selectCustomer,
  selectCustomerUserId,
  insertCustomer,
  selectCustomerEmail,
  selectCustomerPassword,
  selectCustomerAccount,
  selectCustomerNickName,
  selectCustomerRecipient,
  updateCustomerInfo,
  updateStatus,
};