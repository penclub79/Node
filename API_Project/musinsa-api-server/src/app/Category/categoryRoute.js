module.exports = function (app) {
  const category = require('./categoryController');

  // 1. 카테고리 조회(+ categoryName)
  app.get('/app/categories', category.getCategory);

  // 2. 카테고리 삭제
  app.patch('/app/categories/:categoryIdx', category.patchDeleteCategory);
};