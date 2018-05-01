let BaseService = require('../base/BaseService');
let Condition = require('../utils/Condition');

let actUserDao = refDaos('actUserDao');

class ActUserService extends BaseService {

    constructor() {
        super('actUserDao');
    }

    async getMember(id) {
        let sql = 'SELECT * FROM act_user au LEFT JOIN `user` u ON au.uid=u.uid';
        return await actUserDao.selectBySql(sql, Condition.create().eq('aid', id));
    }

    async getActive(id, page) {
        let sql = 'SELECT * FROM act_user au LEFT JOIN active a ON au.aid=a.aid';
        return await actUserDao.pageSelectBySql(sql, Condition.create().eq('uid', id), page);
    }

    async check(data) {
        let condition = Condition.create().eq('aid', data.aid).eq('uid', data.uid);
        let res = await actUserDao.selectList(condition);
        if (res.length > 0) {
            return res[0];
        } else {
            return null;
        }
    }
}

module.exports = ActUserService;