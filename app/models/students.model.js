const mongoose = require('mongoose');

const studentsSchema = mongoose.Schema({
    name: String,
    address: String
}, {
    timestamps: true
});

module.exports = mongoose.model('students', studentsSchema);