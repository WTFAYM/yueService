let BaseController = require('../base/BaseController');
let JsonUtils = require('../utils/JsonUtils');
let Condition = require('../utils/Condition');

let treeService = refServices('treeService');

class TreeController extends BaseController {

    constructor() {
        super();
    }

    async list(req, res) {
        let page = await treeService.pageSelectList(Condition.fromParams(super.params(req)), super.param(req, 'currentPage'));
        super.success(res, page);
    }

    async addTree(req, res) {
        let params = super.params(req);
        let data = JsonUtils.propertyRemain(params, ['content']);
        if (await treeService.addTree(data)) {
            super.success(res);
        } else {
            super.fail(res);
        }
    }

    async deleteTree(req, res) {
        let id = req.param('tid');
        if (id) {
            await treeService.deleteById(id);
        }
        super.success(res);
    }

    async deleteTreeList(req, res) {
        let ids = req.param('tids');
        if (ids !== null && ids instanceof Array) {
            await treeService.deleteBatch(ids);
        }
        super.success(res);
    }
}

module.exports = new TreeController();