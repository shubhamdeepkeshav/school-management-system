const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

let students = [];
let id = 1;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/students', (req, res) => res.json(students));

app.post('/api/students', (req, res) => {
  const student = { id: id++, name: req.body.name, grade: req.body.grade };
  students.push(student);
  res.json(student);
});

app.put('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (student) {
    student.name = req.body.name;
    student.grade = req.body.grade;
    res.json(student);
  } else {
    res.status(404).send('Student not found');
  }
});

app.delete('/api/students/:id', (req, res) => {
  students = students.filter(s => s.id !== parseInt(req.params.id));
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`School Management Website running at http://localhost:${PORT}`);
});
