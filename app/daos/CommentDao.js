let BaseDao = require('../base/BaseDao');

class CommentDao extends BaseDao {
    constructor(){
        super({tableName: 'comment',primaryKey: "cid", autoPK: true});
    }
}
module.exports = CommentDao;