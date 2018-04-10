let BaseController = require('../base/BaseController');
let JsonUtils = require('../utils/JsonUtils');
let Condition = require('../utils/Condition');

let userService = refServices('userService');

class UserController extends BaseController {

    constructor() {
        super();
    }

    index(req, res) {
        super.render(req, res, 'home', {message: req.session.username || 'login'})
    };

    async login(req, res) {
        let user = await userService.checkUser(super.param(req, 'username'), super.param(req, 'password'));
        if (user) {
            if (user.enable === '0') {
                super.fail(res, '已被禁用');
            }else{
                req.session.user = user;
                super.success(res);
            }
        } else {
            super.fail(res, '用户名或密码错误！');
        }
    }

    async getById(req, res) {
        let id = super.param(req, 'id');
        let user = await userService.selectOne(id);
        super.success(res, JsonUtils.propertyFilter(user, ['password', 'del_flag']));
    }

    async addUser(req, res) {
        let params = super.params(req);
        let data = JsonUtils.propertyRemain(params, ['username', 'password', 'nickname', 'enable']);
        if (await userService.addUser(data)) {
            super.success(res);
        }else{
            super.fail(res, '用户名已存在！');
        }
    }

    async deleteUser(req, res) {
        let id = req.param('id');
        if (id) {
            await userService.update({id, del_flag: '1'});
        }
        super.success(res);
    }

    async list(req, res) {
        let page = await userService.pageSelectList(Condition.create().eq('del_flag', '0'), req.param('page'));
        page.data = JsonUtils.propertyFilter(page.data, ['password', 'del_flag']);
        super.success(res, page);
    }

}

// Don't forget to new.
module.exports = new UserController();