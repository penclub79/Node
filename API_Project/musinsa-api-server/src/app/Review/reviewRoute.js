module.exports = function(app) {
  const review = require('./reviewController');
  const jwtMiddleware = require('../../../config/jwtMiddleware');

  // 1. 리뷰 작성 - 유저, 상품, type: 스타일, 상품 사진, 일반
  app.post('/app/reviews/:userIdx', jwtMiddleware, review.postReview);

  // 2. 리뷰 전체 조회 - 상품
  app.get('/app/reviews/:productIdx', review.getReviewByProductName);

  // 3. 리뷰 수정
  app.patch('/app/modify-reviews/:userIdx/:reviewIdx', jwtMiddleware, review.patchReview);

  // 4. 리뷰 삭제
  app.patch('/app/reviews/:userIdx/:reviewIdx', jwtMiddleware, review.patchDeleteReview);

  // 5. 리뷰 type별 조회 type: S:스타일, P:상품 사진, D:일반
  app.get('/app/reviews/:productIdx/type', review.getReviewType);

  // 6. 리뷰 성별 조회 gender: 전체, 남성, 여성
  app.get('/app/reviews/:productIdx/gender', review.getReviewGender);
};