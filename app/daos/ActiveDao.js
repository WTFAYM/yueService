let BaseDao = require('../base/BaseDao');

class ActiveDao extends BaseDao {
    constructor(){
        super({tableName: 'active',primaryKey: "aid", autoPK: true});
    }
}
module.exports = ActiveDao;