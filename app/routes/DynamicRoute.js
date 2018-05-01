module.exports = function (app) {
    let controller = app.controllers.DynamicController;
    app.route('/dynamic/list').post(controller.list);
    app.route('/dynamic/getListByUser').post(controller.getListByUser);
    app.route('/dynamic/getDynamicByUser').post(controller.getDynamicByUser);
    app.route('/dynamic/getDynamicById').post(controller.getDynamicById);
    app.route('/dynamic/addDynamic').post(controller.addDynamic);
    app.route('/dynamic/delete').post(controller.deleteActive);
    app.route('/dynamic/deleteList').post(controller.deleteList);
};