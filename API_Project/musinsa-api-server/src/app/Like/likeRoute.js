module.exports = function(app){
  const like = require('./likeController');
  const jwtMiddleware = require('../../../config/jwtMiddleware');

  // 좋아요 상품 조회
  app.get('/app/boards/:userIdx/like-products', jwtMiddleware, like.getUserByLike);

  // 좋아요 브랜드 조회
  // app.get('/app/boards/:userIdx/like-brands', jwtMiddleware,  like.getUserByLikeBrand);

  // 좋아요 활성/비활성
  app.patch('/app/:userIdx/:productIdx/like', jwtMiddleware, like.patchProductLike);
};