let BaseService = require('../base/BaseService');
let Condition = require('../utils/Condition');

let labelDao = refDaos('labelDao');

class LabelService extends BaseService {

    constructor() {
        super('labelDao');
    }
}

module.exports = LabelService;