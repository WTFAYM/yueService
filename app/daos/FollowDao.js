let BaseDao = require('../base/BaseDao');

class FollowDao extends BaseDao {
    constructor(){
        super({tableName: 'follow',primaryKey: "fid", autoPK: true});
    }
}
module.exports = FollowDao;