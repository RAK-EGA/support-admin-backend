const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    ticketID: {
        type: String,
        required: true
    },
    citizenID: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    serviceName: {
        type: String
    },
    sla_value: {
        type: Number,
        required: true
    },
    sla_unit: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    assignedTo: {
        type: String,
        required: true
    },
    slaExceedTime: {
        type: Number,
        required: true
    },
    isSeen: {
        type: String,
        default: "false"
    },
},{
    timestamps: true
});

module.exports = mongoose.model("notification", notificationSchema);