module.exports = function(app) {
  const tag = require('./tagController');

  // 1. 상품에 대한 tag 조회
  app.get('/app/products/tags', tag.getProductByTag);

  // 2. tag 삭제
  app.patch('/app/tags/:tagIdx', tag.patchDeleteTag);
};