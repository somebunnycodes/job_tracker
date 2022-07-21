const jobController = require("../controllers/job.controller");

module.exports = (app) => {
    app.get("/", (req, res) => {res.json({msg: "all set up"})});
    app.post("/api/job", jobController.createNewJob);
    app.get("/api/job", jobController.getAllJobs);
    app.get("/api/job/:id", jobController.getOneJob);
    app.put("/api/job/:id", jobController.updateJob);
    app.delete("/api/job/:id", jobController.deleteJob);
};