module.exports = function(app) {
  const recipient = require('./recipientController');
  const jwtMiddleware = require('../../../config/jwtMiddleware');

  // 1. 유저 배송지 생성
  app.post('/app/:userIdx/join-recipients', jwtMiddleware, recipient.postRecipient);

  // 2. 유저 배송지리스트 조회
  app.get('/app/:userIdx/recipients', jwtMiddleware, recipient.getRecipientListByUserIdx);

  // 3. 배송지 수정
  app.patch('/app/:userIdx/recipients/:recipientIdx', jwtMiddleware, recipient.patchRecipientInfo)

  // 4. 배송지 삭제
  app.patch('/app/:userIdx/recipients/:recipientIdx/status', jwtMiddleware, recipient.patchRecipientStatus)
};