let BaseDao = require('../base/BaseDao');

class DynamicDao extends BaseDao {
    constructor(){
        super({tableName: 'dynamic',primaryKey: "did", autoPK: true});
    }
}
module.exports = DynamicDao;