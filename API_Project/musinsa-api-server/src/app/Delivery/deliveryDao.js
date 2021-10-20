async function selectDeliveryStatus (connection, deliveryStatus, userIdx) {
  const selectDeliveryStatusQuery = `
      select
          productName,
          price,
          PO.productSize,
          PO.orderNum,
          orderDate,
          case
              when deliveryStatus = 'payment' then '입금결제'
              when deliveryStatus = 'delivery' then '배송중'
              when deliveryStatus = 'success' then '배송완료'
              when deliveryStatus = 'check' then '구매확정'
              end as deliveryStatus
      from Delivery
               LEFT JOIN ProductOrder PO on PO.idx = Delivery.orderIdx
               LEFT JOIN ProductInfo PI on PO.productIdx = PI.idx
               LEFT JOIN Review R on Delivery.idx = R.deliveryIdx
      where deliveryStatus=? and Delivery.customIdx = ?;
  `;

  const [deliveryRow] = await connection.query(selectDeliveryStatusQuery, [deliveryStatus, userIdx]);
  return deliveryRow;
};

async function updateStatus (connection, status, userIdx, deliveryIdx) {
  console.log(userIdx);
  const updateStatusQuery = `
    UPDATE Delivery
    SET deliveryStatus = ?
    WHERE customIdx=? and idx = ?;
  `;

  const updateStatusRow = connection.query(updateStatusQuery, [status, userIdx, deliveryIdx]);

  return updateStatusRow[0];
}

module.exports = {
  selectDeliveryStatus,
  updateStatus
};