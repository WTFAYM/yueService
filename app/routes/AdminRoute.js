module.exports = function (app) {
    let controller = app.controllers.AdminController;
    // app.route('/xx').get(controller.xxx);
    app.route('/admin/login').post(controller.login);
};