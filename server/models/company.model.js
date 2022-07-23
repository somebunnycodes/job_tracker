const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema( {
    name: {
        type: String,
        required: [true, "Company name is required"],
        unique: true
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);