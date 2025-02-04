const mongoose = require ('mongoose');

const bloodSchema = new mongoose.Schema(
    {
        bloodGroup: {
            type: String,
            required: true,
        },
        rhesusFactor: {
            type: String,
            required: true ,
        },
        hasDonatedBefore: {
            type: Boolean,
            required: true,
        },
        address: {
            type: String,
            required: true
        },
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Blood", bloodSchema);