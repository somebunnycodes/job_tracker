const Company = require("../models/company.model");
const UserToken = require('../util/UserToken');

const createNewCompany = (req, res) => {
  Company.create(req.body)
    .then((newCompany) => {
      res.json(newCompany);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const getAllCompanies = (req, res) => {
  Company.find()
    .then((allCompanies) => {
      res.json(allCompanies);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const getOneCompany = (req, res) => {
  Company.findOne({ _id: req.params.id })
    .then((queriedCompany) => res.json(queriedCompany))
    .catch((err) => {
      res.status(400).json({ err });
    });
};

module.exports = {
  createNewCompany,
  getAllCompanies,
  getOneCompany
};