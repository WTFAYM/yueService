module.exports = function (app) {
    let controller = app.controllers.TreeController;
    // app.route('/xx').get(controller.xxx);
    app.route('/tree/list').post(controller.list);
    app.route('/tree/add').post(controller.addTree);
    app.route('/tree/delete').post(controller.deleteTree);
    app.route('/tree/deleteList').post(controller.deleteTreeList);
};