let ReturnDTO = require('../utils/ReturnDTO');
let HttpCode = require('../utils/HttpCode');

let authSet = new Set([ '/user/update']);

module.exports = (req, res, next) => {
    if (authSet.has(req.path) && (!req.session.hasOwnProperty('user') || !req.session.user)) {
        res.json(ReturnDTO.code(HttpCode.UNAUTHORIZED));
        res.end();
    } else {
        next();
    }
};