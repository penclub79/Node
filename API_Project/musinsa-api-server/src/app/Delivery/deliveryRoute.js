module.exports = function(app) {
  const delivery = require('./deliveryController');
  const jwtMiddleware = require('../../../config/jwtMiddleware');

  // 특정 배송상태 조회
  /** Status : payment, delivery, success, check **/
  app.get('/app/deliveries/:userIdx/:status', jwtMiddleware, delivery.getDeliveryByStatus);

  // 배송 상태 변경 및 수정
  app.patch('/app/:userIdx/deliveries/:deliveryIdx', jwtMiddleware, delivery.patchDeliveryStatus);
};