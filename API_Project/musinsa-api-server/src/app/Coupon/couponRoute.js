module.exports = function(app){
  const coupon = require('./couponController');
  const jwtMiddleware = require('../../../config/jwtMiddleware');

  // 쿠폰 생성
  app.post('/app/register-coupons', coupon.postCoupon);

  // 유저 쿠폰게시판 조회(사용가능한것만 보이기)
  app.get('/app/:userIdx/coupons', coupon.getCoupons);

  // 유저 쿠폰 사용 조회
  // app.get('/app/coupons/:status');
};