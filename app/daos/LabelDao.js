let BaseDao = require('../base/BaseDao');

class LabelDao extends BaseDao {
    constructor(){
        super({tableName: 'label', primaryKey: "laid", autoPK: true});
    }
}
module.exports = LabelDao;