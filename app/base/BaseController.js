let ReturnDTO = require("../utils/ReturnDTO");
let HttpCode = require("../utils/HttpCode");

require('express-async-errors');

class BaseController {
    success(res, data = {}) {
        res.json(ReturnDTO.create(HttpCode.OK.code, HttpCode.OK.msg, data));
    }
    fail(res, msg = '操作失败', data = {}) {
        res.json(ReturnDTO.create(HttpCode.UN_KNOW_ERROR.code, msg, data));
    }
    json(code, msg, data) {
        res.json(ReturnDTO.create(code, msg, data));
    }
    render(req, res, path, data = {}) {
        res.render(path, data);
    }

    /**
     * Get all params
     * @param req
     * @returns {{}}
     */
    params(req) {
        return {...req.params, ...req.body, ...req.query};
    }

    param(req, name, defaultValue) {
        return req.params[name] || req.body[name] || req.query[name] || defaultValue;
    }

    ref(name) {
        if (!beanContainer.services[name.toLowerCase()]){
            throw new Error(`Can't found ${name}.`);
        }
        return beanContainer.services[name.toLowerCase()];
    }
}

module.exports = BaseController;