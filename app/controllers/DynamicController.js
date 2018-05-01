let BaseController = require('../base/BaseController');
let JsonUtils = require('../utils/JsonUtils');
let Condition = require('../utils/Condition');

let dynamicService = refServices('dynamicService');

class DynamicController extends BaseController {

    constructor() {
        super();
    }

    async deleteActive(req, res) {
        let id = req.param('did');
        if (id) {
            await dynamicService.deleteById(id);
        }
        super.success(res);
    }

    async deleteList(req, res) {
        let ids = req.param('dids');
        if (ids !== null && ids instanceof Array) {
            await dynamicService.deleteBatch(ids);
        }
        super.success(res);
    }

    //获取信息
    async list(req, res) {
        let data = await dynamicService.list(super.param(req, 'currentPage'));
        data = JsonUtils.propertyFilter(data, ['password'])
        super.success(res, data);
    }

    //获取用户的动态列表
    async getListByUser(req, res) {
        let data = await dynamicService.selectList(Condition.fromParams(super.param(req, 'uid')));
        super.success(res, data);
    }

    async getDynamicByUser(req, res) {
        let username = super.param(req, 'username');
        let list = await dynamicService.getDynamicByUser(username);
        list = JsonUtils.propertyFilter(list, ['password'])
        super.success(res, list);
    }

    async getDynamicById(req, res) {
        let id = super.param(req, 'did');
        let active = await dynamicService.selectOne(id);
        super.success(res, active);
    }

    async addDynamic(req, res) {
        let params = super.params(req);
        if (await dynamicService.insert(params)) {
            super.success(res);
        } else {
            super.fail(res, '数据异常！');
        }
    }
}

module.exports = new DynamicController();