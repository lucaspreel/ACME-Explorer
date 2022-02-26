"use strict";
module.exports = function (app) {
  const application = require("../controllers/applicationController");

  app
    .route("/v1/applications")
    .get(application.list_all_application)
    .post(application.create_an_application);

  app
    .route("/v1/applications/:applicationId")
    .delete(application.delete_an_application);

  app
    .route("/v1/applications/manager/:managerId")
    .get(application.find_by_manager_id);

  app
    .route("/v1/applications/explorer/:explorerId")
    .get(application.find_by_explorer_id);

  app
    .route("/v1/applications/:applicationId/reject")
    .patch(application.reject_application);

  app
    .route("/v1/applications/:applicationId/due")
    .patch(application.due_application);

  app
    .route("/v1/applications/:applicationId/pay")
    .patch(application.pay_application);

  app
    .route("/v1/applications/:applicationId/cancel")
    .patch(application.cancelled_application);
};
