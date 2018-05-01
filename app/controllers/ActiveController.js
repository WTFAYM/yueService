let BaseController = require('../base/BaseController');
let JsonUtils = require('../utils/JsonUtils');
let Condition = require('../utils/Condition');

let activeService = refServices('activeService');

class ActiveController extends BaseController {

    constructor() {
        super();
    }

    async deleteActive(req, res) {
        let id = req.param('aid');
        if (id) {
            await activeService.deleteById(id);
        }
        super.success(res);
    }

    async deleteList(req, res) {
        let ids = req.param('aids');
        if (ids !== null && ids instanceof Array) {
            await activeService.deleteBatch(ids);
        }
        super.success(res);
    }

    //获取信息
    async activeList(req, res) {
        let data = await activeService.activeList(super.param(req, 'currentPage'));
        data = JsonUtils.propertyFilter(data, ['password'])
        super.success(res, data);
    }

    //获取创建者信息
    // async getCreator(req, res) {
    //     let aid = super.param(req, 'aid');
    //     let data = await activeService.getCreator(aid)
    //     data = JsonUtils.propertyFilter(data, ['password']);
    //     super.success(res, data)
    // }

    // //通过用户名获取用户信息
    // async getListByName(req, res) {
    //     let page = await activeService.pageSelectList(Condition.fromParams(super.params(req)), super.param(req, 'username'));
    //     super.success(res, page);
    // }

    async getActiveById(req, res) {
        let id = super.param(req, 'aid');
        let active = await activeService.selectOne(id);
        super.success(res, active);
    }

    // getActiveByUser
    async getActiveByUser(req, res) {
        let username = super.param(req, 'username');
        let list = await activeService.getActiveByUser(username);
        list = JsonUtils.propertyFilter(list, ['password'])
        super.success(res, list);
    }

    async addActive(req, res) {
        let params = super.params(req);
        if (await activeService.insert(params)) {
            super.success(res);
        } else {
            super.fail(res, '数据异常！');
        }
    }
}

module.exports = new ActiveController();