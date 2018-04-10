module.exports = {
    create: (code, msg, data) => ({code, msg, data}),
    fail: msg => ({code: 500, msg}),
    success: data => ({code: 200, msg: '操作成功', data}),
    code: code => ({code: code.code, msg: code.msg}),
};