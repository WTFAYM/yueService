module.exports = function (app) {
    let controller = app.controllers.ActiveController;
    app.route('/active/activeList').post(controller.activeList);
    app.route('/active/getActiveById').post(controller.getActiveById);
    app.route('/active/getActiveByUser').post(controller.getActiveByUser);
    app.route('/active/addActive').post(controller.addActive);
    app.route('/active/delete').post(controller.deleteActive);
    app.route('/active/deleteList').post(controller.deleteList);
};