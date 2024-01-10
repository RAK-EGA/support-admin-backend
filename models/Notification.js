const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    ticketID: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    SLAExceedTime: {
        type: Number,
        required: true
    },
},{
    timestamps: true
});

module.exports = mongoose.model("announcement", announcementSchema);