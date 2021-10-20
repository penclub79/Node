const brandProvider = require("../../app/Brand/brandProvider");
const brandService = require("../../app/Brand/brandService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

exports.getBrands = async function (req, res) {

  /**
   * Query String: brandName
   * **/
  const brandName = req.query.name;

  if (!brandName) {
    // brand 전체 조회
    const brandList = await brandProvider.retrieveBrand();
    return res.send(response(baseResponse.SUCCESS, brandList));
  } else {
    // brandName 조회
    const brandListByBrandName = await brandProvider.retrieveBrand(brandName);
    return res.send(response(baseResponse.SUCCESS, brandListByBrandName));
  }
};

exports.patchDeleteBrand = async function (req, res) {
  /**
   * body: status="DELETE"
   * **/

  const brandIdx = req.params.brandIdx;
  const {status} = req.body;

  if (!brandIdx) return res.send(errResponse(baseResponse.BRAND_IDX_EMPTY));

  const editStatus = await brandService.editStatus(status, brandIdx);

  return res.send(editStatus);
}