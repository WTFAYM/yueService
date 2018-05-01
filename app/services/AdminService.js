let BaseService = require('../base/BaseService');
let Condition = require('../utils/Condition');
let md5 = require('md5');
let adminDao = refDaos('adminDao');

class AdminService extends BaseService {

    constructor() {
        super('adminDao');
    }
    async checkAdmin(username, password) {
        password = md5(password);
        let condition = Condition.create().eq('account', username).eq('pwd', password);
        let res = await adminDao.selectList(condition);
        if (res.length > 0) {
            return res[0];
        } else {
            return null;
        }
    }
}

module.exports = AdminService;