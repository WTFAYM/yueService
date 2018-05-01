let BaseService = require('../base/BaseService');
let Condition = require('../utils/Condition');

let activeDao = refDaos('activeDao');

class ActiveService extends BaseService {

    constructor() {
        super('activeDao');
    }

    async addActive(data) {
        data.ctime = new Date();
        data.state = 0;
        return await activeDao.insert(data);
    }

    // async getCreator(id){
    //     let sql = "SELECT u.* FROM `user` u LEFT JOIN active a ON a.creid=u.uid";
    //     return await activeDao.selectBySql(sql, Condition.create().eq('aid', id));
    // }

    async activeList(page) {
        let sql = 'SELECT u.*,a.*,la.label FROM active a LEFT JOIN `user` u ON a.creid=u.uid LEFT JOIN label la ON a.lid = la.laid';
        return await activeDao.pageSelectBySql(sql, Condition.create(), page);
    }

    async getActiveByUser(username) {
        let sql = 'SELECT u.*,a.*,la.label FROM active a LEFT JOIN `user` u ON a.creid=u.uid LEFT JOIN label la ON a.lid = la.laid';
        return await activeDao.pageSelectBySql(sql, Condition.create().like('username', username));
    }

}

module.exports = ActiveService;