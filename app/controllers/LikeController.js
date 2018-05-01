let BaseController = require('../base/BaseController');
let JsonUtils = require('../utils/JsonUtils');
let Condition = require('../utils/Condition');

let likeService = refServices('likeService');

class LikeController extends BaseController {

    constructor() {
        super();
    }

}

module.exports = new LikeController();