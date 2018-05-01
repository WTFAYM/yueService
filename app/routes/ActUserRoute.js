module.exports = function(app){
    let controller = app.controllers.ActUserController;
    app.route('/actUser/getMember').post(controller.getMember);
    app.route('/actUser/join').post(controller.join);
    app.route('/actUser/quit').post(controller.quit);
    app.route('/actUser/getActive').post(controller.getActive);
};