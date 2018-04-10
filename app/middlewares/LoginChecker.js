let ReturnDTO = require('../utils/ReturnDTO');
let HttpCode = require('../utils/HttpCode');

let authSet = new Set(['/user/list', '/user/add', '/user/update', '/user/get']);

module.exports = (req, res, next) => {
    if (authSet.has(req.path) && (!req.session.hasOwnProperty('user') || !req.session.user)) {
        res.json(ReturnDTO.code(HttpCode.UNAUTHORIZED));
        res.end();
    } else {
        next();
    }
};