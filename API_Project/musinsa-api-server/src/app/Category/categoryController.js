const jwtMiddleware = require("../../../config/jwtMiddleware");
const categoryProvider = require("../../app/Category/categoryProvider");
const categoryService = require("../../app/Category/categoryService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

exports.getCategory = async function (req, res) {
  /**
   * Query String: categoryName
   * **/
  const categoryName = req.query.categoryName;

  if (!categoryName) {
    // 카테고리 전체 조회
    const categoryListResult = await categoryProvider.retrieveCategory();
    return res.send(response(baseResponse.SUCCESS, categoryListResult));

  } else {
    // 카테고리 Name 조회
    const productListByCategoryName = await categoryProvider.retrieveCategory(categoryName);
    return res.send(response(baseResponse.SUCCESS, productListByCategoryName));
  }
};

exports.patchDeleteCategory = async function (req, res) {
  /**
   * body: status='DELETE'
   * **/
  const categoryIdx = req.params.categoryIdx;
  const {status} = req.body;

  if (!categoryIdx) return res.send(errResponse(baseResponse.CATEGORY_IDX_EMPTY));

  const editStatus = await categoryService.editStatus(status, categoryIdx);

  return res.send(editStatus);
};