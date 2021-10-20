module.exports = function(app){
  // const refund = require('./refundController');
  const jwtMiddleware = require('../../../config/jwtMiddleware');

  // 환불 등록
  app.post('/app/refunds/:customIdx/:productIdx');

  // 환불 조회
  app.get('/app/refunds/:customIdx/:productIdx');

  // 환불 취소
  app.patch('/app/refunds/:customIdx/:productIdx/:status');
};