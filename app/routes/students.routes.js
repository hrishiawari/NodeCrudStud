module.exports = (app) => {
  const students = require('../controllers/students.controller.js');

  // Create a new Note
  app.post('/students', students.create);

  // Retrieve all Notes
  app.get('/students/findall', students.findAll);

  // Retrieve a single Note with studentId
  app.get('/students/findone/:studentId', students.findOne);

  // Update a Note with studentId
  app.put('/students/update/:studentId', students.update);

  // Delete a Note with studentId
  app.delete('/students/deleteByid/:studentId', students.delete);
}