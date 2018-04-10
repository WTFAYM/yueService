let BaseDao = require('../base/BaseDao');

class UserDao extends BaseDao {
    constructor(){
        super({tableName: 'user', autoPK: false});
    }
}
module.exports = UserDao;