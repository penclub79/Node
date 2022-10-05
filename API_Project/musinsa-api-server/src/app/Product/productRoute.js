module.exports = function (app) {
  const product = require('./productController');

  // 상품 등록 브랜드 -> 상품 -> 태그 -> 카테고리
  app.post('/app/register-products', product.postProductRegister);

  // 1. 상품 브랜드등록
  // app.post('/app/products/brands', product.postBrand);

  // 2. 상품 등록
  // app.post('/app/products', product.postProduct);

  // 3. 상품 태그 등록
  app.post('/app/products/:productIdx/tags', product.postTag);

  // 4. 상품 카테고리
  // app.post('/app/products/categories', product.postCategory);

  // ★위 절차로 등록이 되어야함.  추후 하나의 쿼리로 완성시키기★

  // 상품 조회
  app.get('/app/products', product.getProducts);

  // 상품 삭제
  app.patch('/app/status-products/:productIdx', product.patchDeleteProduct);
}