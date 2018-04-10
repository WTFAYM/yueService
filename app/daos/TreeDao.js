let BaseDao = require('../base/BaseDao');

class TreeDao extends BaseDao {
    constructor(){
        super({tableName: 'tree'});
    }
}
module.exports = TreeDao;