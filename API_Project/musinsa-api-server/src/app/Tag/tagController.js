const tagProvider = require("../../app/Tag/tagProvider");
const tagService = require("../../app/Tag/tagService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

exports.getProductByTag = async function (req, res){
  /**
   * Query String: productTag
   * **/

  const productTag = req.query.productTag;

  if (!productTag) return res.send(errResponse(baseResponse.TAG_NAME_EMPTY));

  const productIdxByTag = await tagProvider.retrieveTag(productTag);
  return res.send(response(baseResponse.SUCCESS, productIdxByTag));
};

exports.patchDeleteTag = async function (req, res) {
  /**
   * body: status='DELETE'
   * **/
  const tagIdx = req.params.tagIdx;
  const {status} = req.body;

  if (!tagIdx) return res.send(errResponse(baseResponse.TAG_IDX_EMPTY));

  const editStatus = await tagService.editStatus(status, tagIdx);

  return res.send(editStatus);
}