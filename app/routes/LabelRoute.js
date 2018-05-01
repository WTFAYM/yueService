module.exports = function(app){
    let controller = app.controllers.LabelController;
    // app.route('/xx').get(controller.xxx);
    app.route('/label/list').post(controller.list);
    app.route('/label/add').post(controller.addLabel);
    app.route('/label/delete').post(controller.deleteLabel);
};