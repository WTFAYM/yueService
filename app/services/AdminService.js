let BaseService = require('../base/BaseService');
let Condition = require('../utils/Condition');

let adminDao = refDaos('adminDao');

class AdminService extends BaseService {

    constructor() {
        super('adminDao');
    }
}

module.exports = AdminService;