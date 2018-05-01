module.exports = function (app) {
    let controller = app.controllers.UserController;
    app.route('/user/list').post(controller.list);
    app.route('/user/login').post(controller.register);
    app.route('/user/register').post(controller.login);
    app.route('/user/forgot').post(controller.forgot);
    app.route('/user/update').post(controller.update);
    app.route('/user/add').post(controller.addUser);
    app.route('/user/delete').post(controller.deleteUser);
    app.route('/user/deleteList').post(controller.deleteList);
    app.route('/user/getUserById').post(controller.getUserById);
    app.route('/user/getListByName').post(controller.getListByName);
};