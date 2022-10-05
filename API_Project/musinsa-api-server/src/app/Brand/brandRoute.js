module.exports = function(app) {
  const brand = require('./brandController');

  // brand 리스트 조회(전체조회)
  app.get('/app/brands', brand.getBrands);

  // brand 삭제
  app.patch('/app/brands/:brandIdx', brand.patchDeleteBrand);
};