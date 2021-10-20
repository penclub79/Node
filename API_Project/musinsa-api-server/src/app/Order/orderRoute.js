module.exports = function(app){
  const order = require('./orderController');
  const jwtMiddleware = require('../../../config/jwtMiddleware');

  // 1. 해당 상품 주문 하기(등록)
  // app.post('/app/order:productName', order.postOrder);

  // 1. 상품 주문(등록) 위 주소로 로직 변경하기
  app.post('/app/register-orders/:userIdx/', jwtMiddleware, order.postOrder);

  // 2. 주문 조회 - 유저ID
  app.get('/app/orders/:userIdx/', jwtMiddleware, order.getOrderListByUserId);

  // 3. 주문 총 금액 - 유저ID
  app.get('/app/orders/:userIdx/total', jwtMiddleware, order.getOrderTotalPrice);

  // 4. 주문 상태 변경(교환, 반품)
  // app.patch('/app/orders/:userIdx/status', jwtMiddleware, order.patchOrderStatus);
};