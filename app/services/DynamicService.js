let BaseService = require('../base/BaseService');
let Condition = require('../utils/Condition');

let dynamicDao = refDaos('dynamicDao');

class DynamicService extends BaseService {

    constructor() {
        super('dynamicDao');
    }

    async list(page) {
        let sql = 'SELECT u.* ,d.* FROM `dynamic` d LEFT JOIN `user` u ON u.uid = d.creid';
        return await dynamicDao.pageSelectBySql(sql, Condition.create(), page);
    }

    async getDynamicByUser(username) {
        let sql = 'SELECT u.* ,d.* FROM `dynamic` d LEFT JOIN `user` u ON u.uid = d.creid';
        return await dynamicDao.pageSelectBySql(sql, Condition.create().like('username', username));
    }
}

module.exports = DynamicService;