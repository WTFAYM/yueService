let BaseController = require('../base/BaseController');
let JsonUtils = require('../utils/JsonUtils');
let Condition = require('../utils/Condition');

let adminService = refServices('adminService');

class AdminController extends BaseController {

    constructor() {
        super();
    }

    async login(req, res) {
        let admin = await adminService.checkAdmin(super.param(req, 'username'), super.param(req, 'password'));
        if (admin) {
            if (admin.enable === '0') {
                super.fail(res, '已被禁用');
            }else{
                req.session.admin = admin;
                super.success(res,JsonUtils.propertyFilter(admin, ['pwd']));
            }
        } else {
            super.fail(res, '用户名或密码错误！');
        }
    }

}

module.exports = new AdminController();