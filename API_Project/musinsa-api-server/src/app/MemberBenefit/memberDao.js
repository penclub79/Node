async function selectMember(connection, userIdx) {
  const selectMemberQuery = `
      select
          C.userId,
          point,
          reserves,
          IF(ISNULL(sum(PI.price)), 0, sum(PI.price)) as sumPrice,
          IF(ISNULL(ROUND(sum(PI.price)/10 + point)), 0, ROUND(sum(PI.price)/10 + point)) as gradeScore,
          case
              when ISNULL((sum(PI.price)/10 + point)) then 'LV1뉴비'
              when (sum(PI.price)/10 + point) between 0 and 2000 then 'LV1뉴비'
              when (sum(PI.price)/10 + point) between 2001 and 10000 then 'LV2루키'
              when (sum(PI.price)/10 + point) between 10001 and 100000 then 'LV3멤버'
              when (sum(PI.price)/10 + point) between 100001 and 200000 then 'LV4브론즈'
              when (sum(PI.price)/10 + point) between 200001 and 500000 then 'LV5실버'
              when (sum(PI.price)/10 + point) between 500001 and 1000000 then 'LV6골드'
              when (sum(PI.price)/10 + point) between 1000001 and 2000000 then 'LV7플래티넘'
              when 2000001 < (sum(PI.price)/10 + point) then 'LV8다이아몬드'
              end as grade,
          gradeDiscount
      from MemberBenefit
               LEFT JOIN Customer C on MemberBenefit.customIdx = C.idx
               LEFT JOIN Delivery D on C.idx = D.customIdx
               LEFT JOIN ProductOrder PO on D.orderIdx = PO.idx
               LEFT JOIN ProductInfo PI on PO.productIdx = PI.idx
      WHERE C.idx = ?;
  `;

  const selectMemeberRow = await connection.query(
      selectMemberQuery,
      userIdx
  );

  return selectMemeberRow;
}

module.exports = {
  selectMember,
};