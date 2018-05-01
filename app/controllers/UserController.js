let BaseController = require('../base/BaseController');
let JsonUtils = require('../utils/JsonUtils');
let Condition = require('../utils/Condition');

let userService = refServices('userService');

class UserController extends BaseController {

    constructor() {
        super();
    }

    async login(req, res) {
        let user = await userService.checkUser(super.param(req, 'phone'), super.param(req, 'password'));
        if (user) {
            if (user.state === '1') {
                super.fail(res, '已被禁用');
            } else {
                req.session.user = user;
                super.success(res);
            }
        } else {
            super.fail(res, '手机号或密码错误！');
        }
    }

    async register(req, res) {
        let params = super.params(req);
        let data = JsonUtils.propertyRemain(params, ['phone', 'password']);
        if (super.param(req, 'messageCode') === req.session.verifyCode) {
            if (await userService.addUser(data)) {
                super.success(res);
            } else {
                super.fail(res, '手机号已存在！');
            }
        }
    }

    async update(req, res) {
        let params = super.params(req);
        if (await userService.update(params))
            super.success(res);
        else super.fail(res, '服务器异常,请稍后再试');
    }

    async forgot(req, res) {
        let params = super.params(req);
        let data = JsonUtils.propertyRemain(params, ['phone', 'password']);
        if (super.param(req, 'messageCode') === req.session.verifyCode) {
            let user = await userService.checkUser(super.param(req, 'phone'), super.param(req, 'password'));
            if (user) {
                if (await userService.update(data))
                    super.success(res);
                else super.fail(res, '服务器异常,请稍后再试');
            } else {
                super.fail(res, '手机号不存在！');
            }
        }
    }

    async getUserById(req, res) {
        let id = super.param(req, 'uid');
        let user = await userService.selectOne(id);
        super.success(res, JsonUtils.propertyFilter(user, ['password']));
    }

    async getByPhone(req, res) {
        let phone = super.param(req, 'phone');
        let user = await userService.getByPhone(phone);
        super.success(res, JsonUtils.propertyFilter(user, ['password']));
    }

    //通过用户名获取用户信息
    async getListByName(req, res) {
        let page = await userService.pageSelectList(Condition.fromParams(super.params(req)), super.param(req, 'username'));
        page.data = JsonUtils.propertyFilter(page.data, ['password']);
        super.success(res, page);
    }

    async addUser(req, res) {
        let params = super.params(req);
        let data = JsonUtils.propertyRemain(params, ['phone', 'password']);
        if (await userService.addUser(data)) {
            super.success(res);
        } else {
            super.fail(res, '用户名已存在！');
        }
    }

    async deleteUser(req, res) {
        let id = req.param('uid');
        if (id) {
            await userService.deleteById(id);
        }
        super.success(res);
    }

    async deleteList(req, res) {
        let ids = req.param('uids');
        if (ids !== null && ids instanceof Array) {
            await userService.deleteBatch(ids);
        }
        super.success(res);
    }

    async deleteTreeList(req, res) {
        let ids = req.param('uids');
        if (ids !== null && ids instanceof Array) {
            await userService.deleteBatch(ids);
        }
        super.success(res);
    }

    async list(req, res) {
        let page = await userService.pageSelectList(Condition.fromParams(super.params(req)), super.param(req, 'currentPage'));
        page.data = JsonUtils.propertyFilter(page.data, ['password']);
        super.success(res, page);
    }

    async messageCheck(req, res) {
        //随机产生六位数验证码
        let range = function (start, end) {
            let array = [];
            for (let i = start; i < end; ++i) array.push(i);
            return array;
        };
        let randomstr = range(0, 6).map(function (x) {
            return Math.floor(Math.random() * 10);
        }).join('');

        req.session.verifyCode = randomstr;
        console.log(req.session.verifyCode);
        // let number = super.param(req, 'phone');
        //
        // smsClient.sendSMS({
        //     PhoneNumbers: number,
        //     SignName: '约跑',
        //     TemplateCode: 'SMS_133745001',
        //     TemplateParam: '{"code":'+randomstr+'}'
        // }).then(function (res) {
        //     let {Code}=res;
        //     if (Code === 'OK') {
        //         console.log(res)
        super.success(res);
        //     }
        // }, function (err) {
        //     console.log(err)
        // })
    }
}

// Don't forget to new.
module.exports = new UserController();