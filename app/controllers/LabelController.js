let BaseController = require('../base/BaseController');
let JsonUtils = require('../utils/JsonUtils');
let Condition = require('../utils/Condition');

let labelService = refServices('labelService');

class LabelController extends BaseController {

    constructor() {
        super();
    }
    async list(req, res) {
        let page = await labelService.pageSelectList(Condition.fromParams(super.params(req)), super.param(req, 'currentPage'));
        // page.data = JsonUtils.propertyFilter(page.data);
        super.success(res, page);
    }
    async addLabel(req, res){
        let params = super.params(req);
        let data = JsonUtils.propertyRemain(params, ['label','icon']);
        if (await labelService.addLabel(data)) {
            super.success(res);
        } else {
            super.fail(res, '该条树洞已存在！');
        }
    }
    async deleteLabel(req, res){
        let id = req.param('laid');
        if (id) {
            await labelService.deleteById(id);
        }
        super.success(res);
    }
}

module.exports = new LabelController();