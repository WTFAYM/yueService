let BaseDao = require('../base/BaseDao');

class AdminDao extends BaseDao {
    constructor(){
        super({tableName: 'admin'});
    }
}
module.exports = AdminDao;