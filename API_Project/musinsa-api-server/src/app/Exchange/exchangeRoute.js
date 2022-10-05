module.exports = function(app){
  // const exchange = require('./exchangeController');
  const jwtMiddleware = require('../../../config/jwtMiddleware');

  // 교환 등록
  app.post('/app/exchanges/:customIdx/:productIdx');

  // 교환 조회
  app.get('/app/exchanges/:customIdx/:productIdx');

  // 교환 취소
  app.patch('/app/exchanges/:customIdx/:productIdx/:status');
};