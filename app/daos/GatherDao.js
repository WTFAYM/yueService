let BaseDao = require('../base/BaseDao');

class GatherDao extends BaseDao {
    constructor(){
        super({tableName: 'gather'});
    }
}
module.exports = GatherDao;