let BaseController = require('../base/BaseController');
let JsonUtils = require('../utils/JsonUtils');
let Condition = require('../utils/Condition');

let treeService = refServices('treeService');

class TreeController extends BaseController {

    constructor() {
        super();
    }

}

module.exports = new TreeController();