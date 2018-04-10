
module.exports = function(app){
	let controller = app.controllers.UserController;
	app.route('/user').get(controller.index);
	app.route('/user/list').get(controller.list);
	app.route('/user/login').post(controller.login);
	app.route('/user/add').post(controller.addUser);
    app.route('/user/delete').post(controller.deleteUser);
    app.route('/user/get').post(controller.getById);
};