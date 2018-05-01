let BaseService = require('../base/BaseService');
let Condition = require('../utils/Condition');
let md5 = require('md5');

let userDao = refDaos('userDao');

class UserService extends BaseService {

    constructor() {
        // 必须传入该service对应的dao名称
        super('userDao');
    }

    async checkUser(phone, password) {
        password = md5(password);
        let condition = Condition.create().eq('phone', phone).eq('password', password);
        let res = await userDao.selectList(condition);
        if (res.length > 0) {
            return res[0];
        } else {
            return null;
        }
    }

    async getByPhone(phone) {
        let condition = Condition.create().eq('phone', phone);
        let res = await userDao.selectList(condition);
        if (res.length > 0) {
            return res[0];
        } else {
            return null;
        }
    }

    async addUser(data) {
        let condition = Condition.create().eq('phone', data.phone);
        if (userDao.count(condition) > 0) {
            return false;
        }
        data.ussername = data.phone;
        data.gender = 0;
        data.birthday = new Date();
        data.password = md5(data.password);
        data.avatar = "http://139.199.188.40/img/01.jpg";
        data.summary = "这个人很懒，什么都没有说";
        data.state = 0;
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