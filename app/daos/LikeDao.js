let BaseDao = require('../base/BaseDao');

class LikeDao extends BaseDao {
    constructor(){
        super({tableName: 'like',primaryKey: "lid", autoPK: true});
    }
}
module.exports = LikeDao;