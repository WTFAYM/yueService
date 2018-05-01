let BaseService = require('../base/BaseService');
let Condition = require('../utils/Condition');

let labelDao = refDaos('labelDao');

class LabelService extends BaseService {

    constructor() {
        super('labelDao');
    }
    async addLabel(data) {
        return await labelDao.insert(data);
    }
}

module.exports = LabelService;