const companyController = require("../controllers/company.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post("/api/companies", authenticate, companyController.createNewCompany);
    app.get("/api/companies", authenticate, companyController.getAllCompanies);
    app.get("/api/companies/:id", authenticate, companyController.getOneCompany);
};