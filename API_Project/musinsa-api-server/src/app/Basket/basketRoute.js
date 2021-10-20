module.exports = function(app){
  const basket = require('./basketController');
  const jwtMiddleware = require('../../../config/jwtMiddleware');

  // 장바구니 생성
  app.post('/app/:userIdx/:productIdx/baskets', jwtMiddleware, basket.postBasket);

  // 장바구니 조회
  app.get('/app/:userIdx/baskets', jwtMiddleware, basket.getBasket);

  // 장바구니 상품 구매
  app.patch('/app/:userIdx/baskets/:basketIdx', jwtMiddleware, basket.patchBuyProduct);

  // 장바구니 삭제
  app.patch('/app/:userIdx/delete-baskets/:basketIdx', jwtMiddleware, basket.patchDeleteProduct);

};