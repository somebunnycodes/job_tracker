const jobController = require("../controllers/job.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get("/", (req, res) => {res.json({msg: "all set up"})});
    app.post("/api/jobs", authenticate, jobController.createNewJob);
    app.get("/api/jobs", authenticate, jobController.getUserJobs);
    app.get("/api/jobs/:id", authenticate, jobController.getOneJob);
    app.get("/api/companies/:company_id/jobs", authenticate, jobController.getCompanyJobs);
    app.put("/api/jobs/:id", authenticate, jobController.updateJob);
    app.delete("/api/jobs/:id", authenticate, jobController.deleteJob);
};