const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supportStaffSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    inProgressTickets: {
        type: Array
    },
    counter: {
        type: Number,
        default: 0
    },
    dayCounter: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
});

module.exports = mongoose.model("supportStaff", supportStaffSchema);