module.exports = {
    OK: {code: 200, msg: "操作成功"},
    INVALID_REQUEST: {code: 400, msg: "参数错误"},
    UNAUTHORIZED: {code: 401, msg: "没有权限"},
    FORBIDDEN: {code: 403, msg: "禁止访问"},
    NOT_FOUND: {code: 404, msg: "资源不存在"},
    NOT_ACCEPTABLE: {code: 406, msg: "请求的格式不正确"},
    INTERNAL_SERVER_ERROR: {code: 500, msg: "服务器发生错误"},
    UN_KNOW_ERROR: {code: 500, msg: "未知错误"},


};