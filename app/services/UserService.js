let BaseService = require('../base/BaseService');
let Condition = require('../utils/Condition');
let md5 = require('md5');

let userDao = refDaos('userDao');

class UserService extends BaseService {

    constructor() {
        // 必须传入该service对应的dao名称
        super('userDao');
    }

    async checkUser(username, password) {
        password = md5(password);
        let condition = Condition.create().eq('username', username).eq('password', password);
        let res = await userDao.selectList(condition);
        if (res.length > 0) {
            return res[0];
        } else {
            return null;
        }
    }

    async addUser(data) {
        let condition = Condition.create().eq('username', data.username);
        if (userDao.count(condition) > 0) {
            return false;
        }

        data.password = md5(data.password);
        data.del_flag = '0';
        data.create_date = new Date();
        return await userDao.insert(data);
    }


    async testTran() {
        super.surroundTransaction(async conn => {
            await conn.insert({username: '1'});
            // throw new Error('test');
            await conn.insert({username: '2'});
        })
    }

}

module.exports = UserService;