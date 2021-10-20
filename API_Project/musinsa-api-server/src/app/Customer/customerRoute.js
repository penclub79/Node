module.exports = function(app){
  const customer = require('./customerController');
  const jwtMiddleware = require('../../../config/jwtMiddleware');

  // 0. 테스트 API
  //유저 조회
  app.get('/app/users', customer.getCustomers);

  // 특정 유저 조회
  app.get('/app/users/:userId', customer.getCustomerById);

  // 유저 생성
  app.post('/app/join-users', customer.postCustomers);

  // 로그인
  app.post('/app/login', customer.login);

  // 유저 정보 수정
  app.patch('/app/modify-users/:userIdx/', jwtMiddleware, customer.patchCustomers);

  // 유저 상태변경
  app.patch('/app/status-users/:userIdx/', jwtMiddleware, customer.patchCustomerStatus);
  // 유저 로그인
  // app.post('/app/login', customer.login);
  // app.get('/app/test', user.getTest)
  //
  // // const test = require('../controllers/testController');
  // // // const jwtMiddleware = require('../../../config/jwtMiddleware');
  // // app.get('/test', test.default);
  //
  // // 1. 유저 생성 (회원가입) API
  // app.post('/app/users', user.postUsers);
  // // app.route('/app/users',).post(user.postUsers);
  // // 2. 유저 조회 API (+ 검색)
  // app.get('/app/users',user.getUsers);
  //
  // // 3. 특정 유저 조회 API
  // app.get('/app/users/:userId', user.getUserById);
  //
  //
  // // TODO: After 로그인 인증 방법 (JWT)
  // // 로그인 하기 API (JWT 생성)
  // app.post('/app/login', user.login);
  //
  // // 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
  // app.patch('/app/users/:userId', jwtMiddleware, user.patchUsers)
};