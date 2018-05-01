let BaseController = require('../base/BaseController');
let JsonUtils = require('../utils/JsonUtils');
let Condition = require('../utils/Condition');

let followService = refServices('followService');

class FollowController extends BaseController {

    constructor() {
        super();
    }

    async follow(req, res) {
        let params = super.params(req);
        let data = JsonUtils.propertyRemain(params, ['mid', 'sid']);
        let list = await followService.checkFollow(data);
        if (list) {
            super.fail(res,'数据异常');
            return
        }
        if (await followService.insert(data)) {
            super.success(res)
        } else {
            super.fail(res, '数据异常');
        }
    }

    async cancelFollow(req, res) {
        if (await followService.deleteById(super.param(req, 'fid'))) {
            super.success(res)
        } else {
            super.fail(res, '数据异常');
        }
    }

    async masterList(req, res) {
        //获取查询关注列表，被关注列表
        super.success(res, await followService.selectMasterList(super.param(req, 'sid')));
    }

    async servantList(req, res) {
        //获取查询关注列表，被关注列表
        // sql一般不写在controller
        super.success(res, await followService.selectServantList(super.param(req, 'mid')));
    }
}

module.exports = new FollowController();