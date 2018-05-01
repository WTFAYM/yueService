let BaseController = require('../base/BaseController');
let JsonUtils = require('../utils/JsonUtils');
let Condition = require('../utils/Condition');

let actUserService = refServices('actUserService');

class ActUserController extends BaseController {

    constructor() {
        super();
    }

    async getMember(req, res) {
        //成员列表
        let data = await actUserService.getMember(super.param(req, 'aid'))
        //过滤密码
        data = data.map(item => JsonUtils.propertyFilter(item, ['password']))
        super.success(res, data);
    }

    async getActive(req, res) {
        //获取活动历史
        super.success(res, await actUserService.getActive(super.param(req, 'uid'), super.param(req, 'currentPage')));
    }

    async quit(req, res) {
        if (await actUserService.deleteById(super.param(req, 'auid'))) {
            super.success(res)
        } else {
            super.fail(res, '数据异常');
        }
    }

    async join(req, res) {
        let params = super.params(req);
        let data = JsonUtils.propertyRemain(params, ['aid', 'uid']);
        let list = await actUserService.check(data);
        if (list) {
            super.fail(res, '数据异常');
            return
        }
        if (await actUserService.insert(data)) {
            super.success(res)
        } else {
            super.fail(res, '数据异常');
        }
    }


}

module.exports = new ActUserController();