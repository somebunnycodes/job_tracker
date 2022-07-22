const Job = require("../models/job.model");
const UserToken = require('../util/UserToken');

const createNewJob = (req, res) => {
    // set job user_id to user_id in web token
    req.body.user_id = UserToken.get(req.cookies).payload._id
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
    // find jobs associated with user
    Job.find({user_id: UserToken.get(req.cookies).payload._id})
        .then((userJobs) => {
            res.json(userJobs);
            })
        .catch((err) => {
            res.status(400).json({ err });
            });
};

const getOneJob = (req, res) => {
    // authenticate user requesting job
    const user_id = UserToken.get(req.cookies).payload._id
    
    Job.findOne({ _id: req.params.id })
        .then((queriedJob) => {
            if (queriedJob.user_id!==user_id) {
                res.status(400).json({error: 'You do not have access to this resource'})
                return
            }
            res.json(queriedJob);
            })
        .catch((err) => {
            res.status(400).json({ err });
            });
};

const updateJob = async(req, res) => {
    try {
        // authenticate user updating job
        const user_id = UserToken.get(req.cookies).payload._id
        const job = await Job.findOne({ _id: req.params.id })
        if (job.user_id!==user_id) {
            res.status(400).json({error: 'You do not have access to this resource'})
            return
        }
        const updatedJob = await Job.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        })
        res.json({ updatedJob })
    } catch(err) {
        res.status(400).json({ err })
    }
};

const deleteJob = async(req, res) => {
    try {
        // authenticate user deleting job
        const user_id = UserToken.get(req.cookies).payload._id
        const job = await Job.findOne({ _id: req.params.id })
        if (job.user_id!==user_id) {
            res.status(400).json({error: 'You do not have access to this resource'})
            return
        }
        const deleteResponse = await Job.deleteOne({ _id: req.params.id })
        res.json({ deleteResponse })
    } catch(err) {
        res.status(400).json(err)
    }
    
};

module.exports = {
    createNewJob,
    getAllJobs,
    getUserJobs,
    getOneJob,
    updateJob,
    deleteJob,
};