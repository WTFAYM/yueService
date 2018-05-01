let BaseDao = require('../base/BaseDao');

class TreeDao extends BaseDao {
    constructor() {
        super({tableName: 'tree', primaryKey: "tid", autoPK: true});
    }
}

module.exports = TreeDao;