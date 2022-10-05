module.exports = function(app){
  const member = require('./memberController');
  const jwtMiddleware = require('../../../config/jwtMiddleware');

  // 유저 등급조회
  app.get('/app/:userIdx/member',jwtMiddleware, member.getUserByMember);

  // 유저 포인트 조회
  // app.get('/app/:userIdx/member/point', member.getUserByPoint);

};