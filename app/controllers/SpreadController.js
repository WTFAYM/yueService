let BaseController = require('../base/BaseController');
let JsonUtils = require('../utils/JsonUtils');
let Condition = require('../utils/Condition');

let spreadService = refServices('spreadService');

class SpreadController extends BaseController {

    constructor() {
        super();
    }

}

module.exports = new SpreadController();