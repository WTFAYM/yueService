let BaseDao = require('../base/BaseDao');

class GatherDao extends BaseDao {
    constructor(){
        super({tableName: 'gather',primaryKey: "gid", autoPK: true});
    }
}
module.exports = GatherDao;