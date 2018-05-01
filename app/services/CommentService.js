let BaseService = require('../base/BaseService');
let Condition = require('../utils/Condition');

let commentDao = refDaos('commentDao');

class CommentService extends BaseService {

    constructor() {
        super('commentDao');
    }
}

module.exports = CommentService;