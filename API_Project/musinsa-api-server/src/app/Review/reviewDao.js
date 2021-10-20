// 배송 받은 상품 조회
async function selectDeliveryProduct(connection, productName) {
  const selectDeliveryProductQuery = `
      select
          PI.productName
        from Delivery
        LEFT JOIN ProductOrder PO on PO.idx = Delivery.orderIdx
        LEFT JOIN ProductInfo PI on PI.idx = PO.productIdx
        where Delivery.deliveryStatus = 'check' and PI.productName = ?;  
  `;
  const [deliveryProductName] = await connection.query(selectDeliveryProductQuery, productName);
  return deliveryProductName;
}

// 리뷰 등록
async function insertReview(connection, insertReviewParams) {
  const insertReviewQuery = `
      INSERT INTO Review (
                          customIdx, 
                          deliveryIdx, 
                          rating, 
                          sizeRating, 
                          brightnessRating, 
                          colorRating, 
                          message,
                          reviewType
                          )
      VALUES (
                (select idx from Customer where idx=?),
                (select Delivery.idx from Delivery LEFT JOIN ProductOrder PO on PO.idx = Delivery.orderIdx LEFT JOIN ProductInfo PI on PI.idx = PO.productIdx where Delivery.deliveryStatus = 'check' and PI.productName = ? ),
                ?, ?, ?, ?, ?, ?
             );
  `;

  const insertReviewRow = await connection.query(
      insertReviewQuery,
      insertReviewParams
  );

  return insertReviewRow;
};

// 상품에 대한 리뷰들 조회
async function selectProductNameReview(connection, productIdx) {
  const selectProductNameReviewQuery = `
      select
        (select ROUND(AVG(Review.rating), 1) from Review) as totalRating,
       userId,
       CONCAT(case
          when (sum(price)/10 + point) between 0 and 2000 then 'LV1'
          when (sum(price)/10 + point) between 2001 and 10000 then 'LV2'
           when (sum(price)/10 + point) between 10001 and 100000 then 'LV3'
           when (sum(price)/10 + point) between 100001 and 200000 then 'LV4'
           when (sum(price)/10 + point) between 200001 and 500000 then 'LV5'
           when (sum(price)/10 + point) between 500001 and 1000000 then 'LV6'
           when (sum(price)/10 + point) between 1000001 and 2000000 then 'LV7'
           when 2000001 < (sum(price)/10 + point) then 'LV8'
           end,nickName) as grade,
       CONCAT(productName,'(',color,')') as productName,
       CONCAT(productSize,'구매') as buySize,
       CONCAT(case
           when gender = 'M' then '남성'
               when gender = 'W' then '여성'
                   when gender = 'F' then '전체' end,',',weight,'cm,',height,'kg') as info,
       rating ,
       case sizeRating
        when sizeRating='G' then '커요'
        when sizeRating='U' then '보통이에요'
        when sizeRating='N' then '작아요' end as sizeRating,
    case brightnessRating
        when brightnessRating='G' then '밝아요'
        when brightnessRating='U' then '보통이에요'
        when brightnessRating='N' then '어두워요' end as brightRating,
    case colorRating
        when colorRating='G' then '선명해요'
        when colorRating='U' then '보통이에요'
        when colorRating='N' then '흐려요' end as colorRating,
    case thicknessRating
        when thicknessRating='G' then '두꺼워요'
        when thicknessRating='U' then '보통이에요'
        when thicknessRating='N' then '얇아요' end as thicknessRating,
       message
    from Review
    LEFT JOIN Delivery D on Review.deliveryIdx = D.idx
    LEFT JOIN ProductOrder PO on D.orderIdx = PO.idx 
    LEFT JOIN ProductInfo PI on PO.productIdx = PI.idx 
    LEFT JOIN ProductImg P on PI.idx = P.imgPath 
    LEFT JOIN Customer C on Review.customIdx = C.idx 
    LEFT JOIN MemberBenefit MB on C.idx = MB.customIdx
    where D.deliveryStatus like 'check'
    and PI.idx = ?
    group by Review.idx;
  `;

  const [productReviewRow] = await connection.query(selectProductNameReviewQuery, productIdx);
  return productReviewRow;
}

async function selectUserIdx(connection, userIdx) {
  const selectUserIdxQuery = `
    SELECT idx FROM Customer WHERE idx=?;
  `;

  const [userIdxRow] = await connection.query(selectUserIdxQuery, userIdx);
  return userIdxRow;
}

async function selectReviewType(connection, reviewType, productIdx) {
  const selectReviewTypeQuery = `
      select
         (select ROUND(AVG(Review.rating), 1) from Review) as totalRating,
          userId,
          CONCAT(case
                     when (sum(price)/10 + point) between 0 and 2000 then 'LV1'
                     when (sum(price)/10 + point) between 2001 and 10000 then 'LV2'
                     when (sum(price)/10 + point) between 10001 and 100000 then 'LV3'
                     when (sum(price)/10 + point) between 100001 and 200000 then 'LV4'
                     when (sum(price)/10 + point) between 200001 and 500000 then 'LV5'
                     when (sum(price)/10 + point) between 500001 and 1000000 then 'LV6'
                     when (sum(price)/10 + point) between 1000001 and 2000000 then 'LV7'
                     when 2000001 < (sum(price)/10 + point) then 'LV8'
                     end,nickName) as grade,
          CONCAT(productName,'(',color,')') as productName,
          CONCAT(productSize,'구매') as buySize,
          CONCAT(case
                     when gender = 'M' then '남성'
                     when gender = 'W' then '여성'
                     when gender = 'F' then '전체' end,',',weight,'cm,',height,'kg') as info,
          rating,
          case sizeRating
              when sizeRating='G' then '커요'
              when sizeRating='U' then '보통이에요'
              when sizeRating='N' then '작아요' end as sizeRating,
          case brightnessRating
              when brightnessRating='G' then '밝아요'
              when brightnessRating='U' then '보통이에요'
              when brightnessRating='N' then '어두워요' end as brightRating,
          case colorRating
              when colorRating='G' then '선명해요'
              when colorRating='U' then '보통이에요'
              when colorRating='N' then '흐려요' end as colorRating,
          case thicknessRating
              when thicknessRating='G' then '두꺼워요'
              when thicknessRating='U' then '보통이에요'
              when thicknessRating='N' then '얇아요' end as thicknessRating,
          message
      from Review
               LEFT JOIN Delivery D on Review.deliveryIdx = D.idx
               LEFT JOIN ProductOrder PO on D.orderIdx = PO.idx
               LEFT JOIN ProductInfo PI on PO.productIdx = PI.idx
               LEFT JOIN ProductImg P on PI.idx = P.imgPath
               LEFT JOIN Customer C on Review.customIdx = C.idx
               LEFT JOIN MemberBenefit MB on C.idx = MB.customIdx
      where D.deliveryStatus like 'check'
        and reviewType = ? and PI.idx = ?
      group by Review.idx;
     
  `;

  const [typeRow] = await connection.query(selectReviewTypeQuery, [reviewType, productIdx]);
  return typeRow;
};

async function selectReviewGenderType(connection, reviewGenderType, productIdx) {
  const selectReviewGenderTypeQuery = `
    select
      (select ROUND(AVG(Review.rating), 1) from Review) as totalRating,
       userId,
       CONCAT(case
          when (sum(price)/10 + point) between 0 and 2000 then 'LV1'
          when (sum(price)/10 + point) between 2001 and 10000 then 'LV2'
           when (sum(price)/10 + point) between 10001 and 100000 then 'LV3'
           when (sum(price)/10 + point) between 100001 and 200000 then 'LV4'
           when (sum(price)/10 + point) between 200001 and 500000 then 'LV5'
           when (sum(price)/10 + point) between 500001 and 1000000 then 'LV6'
           when (sum(price)/10 + point) between 1000001 and 2000000 then 'LV7'
           when 2000001 < (sum(price)/10 + point) then 'LV8'
           end,nickName) as grade,
       CONCAT(productName,'(',color,')') as productName,
       CONCAT(productSize,'구매') as buySize,
       CONCAT(case
           when gender = 'M' then '남성'
               when gender = 'W' then '여성'
                   when gender = 'F' then '전체' end,',',weight,'cm,',height,'kg') as info,
       rating,
       case sizeRating
        when sizeRating='G' then '커요'
        when sizeRating='U' then '보통이에요'
        when sizeRating='N' then '작아요' end as sizeRating,
    case brightnessRating
        when brightnessRating='G' then '밝아요'
        when brightnessRating='U' then '보통이에요'
        when brightnessRating='N' then '어두워요' end as brightRating,
    case colorRating
        when colorRating='G' then '선명해요'
        when colorRating='U' then '보통이에요'
        when colorRating='N' then '흐려요' end as colorRating,
    case thicknessRating
        when thicknessRating='G' then '두꺼워요'
        when thicknessRating='U' then '보통이에요'
        when thicknessRating='N' then '얇아요' end as thicknessRating,
       message
    from Review
    LEFT JOIN Delivery D on Review.deliveryIdx = D.idx
    LEFT JOIN ProductOrder PO on D.orderIdx = PO.idx
    LEFT JOIN ProductInfo PI on PO.productIdx = PI.idx
    LEFT JOIN ProductImg P on PI.idx = P.imgPath
    LEFT JOIN Customer C on Review.customIdx = C.idx
    LEFT JOIN MemberBenefit MB on C.idx = MB.customIdx
    where D.deliveryStatus like 'check'
    and C.gender = ? and PI.idx = ?
    group by Review.idx;
  `;

  const [genderTypeRow] = await connection.query(selectReviewGenderTypeQuery, [reviewGenderType, productIdx]);
  return genderTypeRow;
};

async function updateReview(connection, rating, sizeRating, brightnessRating, colorRating, message, userIdx, productIdx) {
  const updateReviewQuery = `
      UPDATE Review
      SET rating = ?,
          sizeRating = ?,
          brightnessRating = ?,
          colorRating = ?,
          message = ?
      WHERE idx = ? and (select idx from ProductInfo where idx=?);
  `;

  const updateReviewRow = await connection.query(updateReviewQuery, [rating, sizeRating, brightnessRating, colorRating, message, userIdx, productIdx]);
  return updateReviewRow[0];
};

async function updateStatus(connection, status, userIdx) {
  const updateStatusQuery = `
    UPDATE Review
    SET status = ?
    WHERE idx = ?;
  `;
  const updateStatusRow = connection.query(updateStatusQuery, [status, userIdx]);

  return updateStatusRow[0];
};


module.exports = {
  selectDeliveryProduct,
  insertReview,
  selectProductNameReview,
  selectUserIdx,
  selectReviewType,
  selectReviewGenderType,
  updateReview,
  updateStatus
};