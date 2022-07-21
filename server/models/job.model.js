const mongoose = require("mongoose");

const JobSchema = mongoose.Schema( {
    title: {
        type: String,
        required: [true, "title is required"],
        minLength: [3, "Title must be at least 3 characters"],
    },

    company: {
        type: String,
        required: [true, "company is required"],
        minLength: [1, "Company must be at least 1 character"],
    },

    languages: {
        type: String,
        required: [true, "languages is required"],
        minLength: [3, "Languages must be at least 3 characters"],
    },

    contact: {
        type: String,
        required: [false],
    },

    description: {
        type: String,
        required: [true, "description is required"],
        minLength: [3, "Description must be at least 3 characters"],
    },

    application_due: {
        type: Date,
        required: [true, "date is required"],
    },

    date_applied: {
        type: Date,
        required: [true, "date is required"],
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