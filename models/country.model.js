const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator')

const countrySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 20,
            minlength: 3,
            unique: true

        },
        contigent: {
            type: String,
            required: true
        },
        rank: {
            type: Number,
            required: true,
            maxlength: 32,
            unique: true
        },
        photo: {
            data: Buffer,
            contentType: String
        }
    },
    { timestamps: true }
);
countrySchema.plugin(uniqueValidator)
module.exports = mongoose.model("CountryData", countrySchema);