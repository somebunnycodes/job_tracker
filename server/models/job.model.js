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

    company: {
        type: String,
        required: [true, "Company is required"],
        minLength: [1, "Company must be at least 1 character"],
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