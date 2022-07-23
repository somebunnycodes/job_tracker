const mongoose = require("mongoose");

const JobSchema = mongoose.Schema( {
    user_id: {
        type: String,
        required: [true, "User ID is required"],
    },

    title: {
        type: String,
        required: [true, "Title is required"],
        minLength: [3, "Title must be at least 3 characters"],
    },

    // Company ID comes from company collection, so needs to not be null / empty / zero
    company_id: {
        type: String,
        required: [true, "Company ID is required"],
    },

    // Company name comes from company collection - name validation happens there, so just needs to not be null
    company_name: {
        type: String,
        required: [true, "Company name is required"]
    },

    languages: {
        type: String,
        required: [true, "Languages is required"],
        minLength: [3, "Languages must be at least 3 characters"],
    },

    contact: {
        type: String,
        required: [false],
    },

    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [3, "Description must be at least 3 characters"],
    },

    application_due: {
        type: Date,
        required: [true, "Date is required"],
    },

    date_applied: {
        type: Date,
        required: [true, "Date is required"],
    },

    misc: {
        type: String,
        required: [false],
    },

    stage: {
        type: Number,
        required: [false],
    },

},
    { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);