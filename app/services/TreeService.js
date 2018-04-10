let BaseService = require('../base/BaseService');
let Condition = require('../utils/Condition');

let treeDao = refDaos('treeDao');

class TreeService extends BaseService {

    constructor() {
        super('treeDao');
    }
}

module.exports = TreeService;