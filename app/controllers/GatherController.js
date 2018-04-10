let BaseController = require('../base/BaseController');
let JsonUtils = require('../utils/JsonUtils');
let Condition = require('../utils/Condition');

let gatherService = refServices('gatherService');

class GatherController extends BaseController {

    constructor() {
        super();
    }

}

module.exports = new GatherController();