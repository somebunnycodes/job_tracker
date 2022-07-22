const Job = require("../models/job.model");
const UserToken = require('../util/UserToken');

const createNewJob = (req, res) => {
    Job.create(req.body)
    .then((newJob) => {
        res.json({ newJob });
        })
    .catch((err) => {
        res.status(400).json({ err });
        });
};

const getAllJobs = (req, res) => {
    Job.find()
    .then((allJobs) => {
        res.json(allJobs);
        })
    .catch((err) => {
        res.status(400).json({ err });
        });
};

const getUserJobs = (req, res) => {
    Job.find({user_id: UserToken.get(req.cookies).payload._id})
        .then((allJobs) => {
            res.json(allJobs);
            })
        .catch((err) => {
            res.status(400).json({ err });
            });
};

const getOneJob = (req, res) => {
    Job.findOne({ _id: req.params.id })
    .then((queriedJob) => {
        res.json(queriedJob);
        })
    .catch((err) => {
        res.status(400).json({ err });
        });
};

const updateJob = (req, res) => {
    Job.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
        })
    .then((updatedJob) => {
        res.json({ updatedJob });
        })
    .catch((err) => {
        res.status(400).json({ err });
        });
};

const deleteJob = (req, res) => {
    Job.deleteOne({ _id: req.params.id })
    .then((deletedResponse) => {
        res.json({ deletedResponse });
        })
    .catch((err) => {
        res.status(400).json({ err });
        });
};

module.exports = {
    createNewJob,
    getAllJobs,
    getUserJobs,
    getOneJob,
    updateJob,
    deleteJob,
};