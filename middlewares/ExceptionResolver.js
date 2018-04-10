let ReturnDTO = require('../app/utils/ReturnDTO');
let HttpCode = require('../app/utils/HttpCode');

module.exports = (resolver = res => res.json(ReturnDTO.code(HttpCode.INTERNAL_SERVER_ERROR))) => async (err, req, res, next) => {
    resolver && resolver(res, err);
    next(err);
};