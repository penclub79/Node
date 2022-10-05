// 배송지 등록
async function insertRecipient(connection, insertRecipientParams) {
  const insertRecipientQuery = `
    insert into Recipient (customIdx, recipientName, recipientAddressName, recipientTelephone, recipientAddress)
      VALUES (
             (select idx from Customer where idx=?),
             ?, ?, ?, ?);
  `;

  const insertRecipientRow = await connection.query(
      insertRecipientQuery,
      insertRecipientParams
  );

  return insertRecipientRow;
};

// 유저 배송지 조회
async function selectRecipientByUserIdx(connection, userIdx) {
  const selectRecipientByUserIdxQuery = `
      select
       recipientName as userName,
       recipientAddressName as addressNickName,
       recipientTelephone as phone,
       recipientAddress as address,
       isDefaultAddress
        from Recipient
        where customIdx=? and status='ACTIVE';
  `;

  const [recipientRow] = await connection.query(selectRecipientByUserIdxQuery, userIdx);
  return recipientRow;
}

// 유저 배송지 수정
async function updateRecipientInfo(connection, recipientName, recipientAddressName, recipientTelephone, recipientAddress, userIdx, recipientIdx) {
  console.log(recipientName, recipientAddressName, recipientTelephone, recipientAddress, userIdx, recipientIdx)
  const updateRecipientInfoQuery = `
    UPDATE Recipient
    SET recipientName = ?,
        recipientAddressName = ?,
        recipientTelephone = ?,
        recipientAddress = ?
    WHERE customIdx=? and idx=?;
  `;

  const updateRecipientRow = await connection.query(updateRecipientInfoQuery, [recipientName, recipientAddressName, recipientTelephone, recipientAddress, userIdx, recipientIdx]);
  return updateRecipientRow;
};

// 유저 배송지 삭제
async function updateRecipientStatus(connection, status, userIdx, recipientIdx) {
  const updateRecipientStatusQuery = `
    UPDATE Recipient
      SET status = ?
      WHERE customIdx = ? and idx = ?;
  `;

  const updateRecipientStatusRow = await connection.query(updateRecipientStatusQuery, [status, userIdx, recipientIdx]);
  return updateRecipientStatusRow;
};


module.exports = {
  insertRecipient,
  selectRecipientByUserIdx,
  updateRecipientInfo,
  updateRecipientStatus
}