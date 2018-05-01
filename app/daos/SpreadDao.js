let BaseDao = require('../base/BaseDao');

class SpreadDao extends BaseDao {
    constructor(){
        super({tableName: 'spread',primaryKey: "sid", autoPK: true});
    }
}
module.exports = SpreadDao;