let BaseService = require('../base/BaseService');
let Condition = require('../utils/Condition');

let treeDao = refDaos('treeDao');

class TreeService extends BaseService {

    constructor() {
        super('treeDao');
    }

    async addTree(data) {
        data.ctime = new Date();
        return await treeDao.insert(data);
    }
}

module.exports = TreeService;