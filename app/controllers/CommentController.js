let BaseController = require('../base/BaseController');
let JsonUtils = require('../utils/JsonUtils');
let Condition = require('../utils/Condition');

let commentService = refServices('commentService');

class CommentController extends BaseController {

    constructor() {
        super();
    }

}

module.exports = new CommentController();