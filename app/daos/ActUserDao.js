let BaseDao = require('../base/BaseDao');

class ActUserDao extends BaseDao {
    constructor(){
        super({tableName: 'act_user',primaryKey: "auid", autoPK: true});
    }
}
module.exports = ActUserDao;