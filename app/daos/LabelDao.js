let BaseDao = require('../base/BaseDao');

class LabelDao extends BaseDao {
    constructor(){
        super({tableName: 'label'});
    }
}
module.exports = LabelDao;