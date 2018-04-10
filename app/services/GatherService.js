let BaseService = require('../base/BaseService');
let Condition = require('../utils/Condition');

let gatherDao = refDaos('gatherDao');

class GatherService extends BaseService {

    constructor() {
        super('gatherDao');
    }
}

module.exports = GatherService;