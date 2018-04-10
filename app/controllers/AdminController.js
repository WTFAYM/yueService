let BaseController = require('../base/BaseController');
let JsonUtils = require('../utils/JsonUtils');
let Condition = require('../utils/Condition');

let adminService = refServices('adminService');

class AdminController extends BaseController {

    constructor() {
        super();
    }

}

module.exports = new AdminController();