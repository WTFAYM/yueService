let BaseService = require('../base/BaseService');
let Condition = require('../utils/Condition');

let spreadDao = refDaos('spreadDao');

class SpreadService extends BaseService {

    constructor() {
        super('spreadDao');
    }
}

module.exports = SpreadService;