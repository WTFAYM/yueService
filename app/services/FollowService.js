let BaseService = require('../base/BaseService');
let Condition = require('../utils/Condition');

let followDao = refDaos('followDao');

class FollowService extends BaseService {

    constructor() {
        super('followDao');
    }
    async checkFollow(data) {
        let condition = Condition.create().eq('mid', data.mid).eq('sid',  data.sid);
        let res = await followDao.selectList(condition);
        if (res.length > 0) {
            return res[0];
        } else {
            return null;
        }
    }

    async selectServantList(id){
        let sql = 'SELECT * FROM follow f LEFT JOIN `user` u ON f.mid = u.uid';
        return await followDao.selectBySql(sql, Condition.create().eq('mid', id));
    }

    async selectMasterList(id){
        let sql = 'SELECT * FROM follow f LEFT JOIN `user` u ON f.sid = u.uid';
        return await followDao.selectBySql(sql, Condition.create().eq('sid', id));
    }

}

module.exports = FollowService;