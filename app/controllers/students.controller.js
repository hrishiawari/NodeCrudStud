
const Student = require('../models/students.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.address) {
        return res.status(400).send({
            message: "Students address can not be empty"
        });
    }
    if (!req.body.name) {
        return res.status(400).send({
            message: "Students name can not be empty"
        });
    }
    // Create a Note
    const stud = new Student({
        name: req.body.name,
        address: req.body.address
    });

    // Save Note in the database
    stud.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Student.find()
        .then(stud => {
            res.send(stud);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};


// Find a single note with a noteId
exports.findOne = (req, res) => {
    Student.findById(req.params.studentId)
        .then(student => {
            if (!student) {
                return res.status(404).send({
                    message: "student not found with id " + req.params.studentId
                });
            }
            res.send(student);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "student not found with id " + req.params.studentId
                });
            }
            return res.status(500).send({
                message: "Error retrieving student with id " + req.params.studentId
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.address) {
        return res.status(400).send({
            message: "Student address can not be empty"
        });
    }
    if (!req.body.name) {
        return res.status(400).send({
            message: "Student address can not be empty"
        });
    }

    // Find note and update it with the request body
    Student.findByIdAndUpdate(req.params.studentId, {
        name: req.body.name,
        address: req.body.address
    }, { new: true })
        .then(student => {
            if (!student) {
                return res.status(404).send({
                    message: "student not found with id " + req.params.studentId
                });
            }
            res.send(student);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Student not found with id " + req.params.studentId
                });
            }
            return res.status(500).send({
                message: "Error updating Student with id " + req.params.studentId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.studentId)
        .then(student => {
            if (!student) {
                return res.status(404).send({
                    message: "student not found with id " + req.params.studentId
                });
            }
            res.send({ message: "student deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "student not found with id " + req.params.studentId
                });
            }
            return res.status(500).send({
                message: "Could not delete student with id " + req.params.studentId
            });
        });
};
