module.exports = function (app) {
    let controller = app.controllers.FollowController;
    app.route('/follow/masterList').post(controller.masterList);
    app.route('/follow/servantList').post(controller.servantList);
    app.route('/follow/follow').post(controller.follow);
    app.route('/follow/cancelFollow').post(controller.cancelFollow);
};