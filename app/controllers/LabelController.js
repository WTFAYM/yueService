let BaseController = require('../base/BaseController');
let JsonUtils = require('../utils/JsonUtils');
let Condition = require('../utils/Condition');

let labelService = refServices('labelService');

class LabelController extends BaseController {

    constructor() {
        super();
    }

}

module.exports = new LabelController();