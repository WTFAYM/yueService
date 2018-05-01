let BaseDao = require('../base/BaseDao');

class UserDao extends BaseDao {
    constructor(){
        super({tableName: 'user', primaryKey: "uid", autoPK: true});
    }
}
module.exports = UserDao;