let BaseService = require('../base/BaseService');
let Condition = require('../utils/Condition');

let likeDao = refDaos('likeDao');

class LikeService extends BaseService {

    constructor() {
        super('likeDao');
    }
}

module.exports = LikeService;