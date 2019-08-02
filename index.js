require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Phonebook = require('./models/phonebook');

const app = express();
app.use(bodyParser.json());
app.use(cors());

morgan.token('data', (request, response) => {
  return JSON.stringify(request.body);
});
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
);
app.use(express.static('build'));

// let persons = [
//   {
//     name: 'Arto Hellas',
//     number: '040-123456',
//     id: 1
//   },
//   {
//     name: 'Ada Lovelace',
//     number: '39-44-5323523',
//     id: 2
//   },
//   {
//     name: 'Dan Abramov',
//     number: '12-43-234345',
//     id: 3
//   },
//   {
//     name: 'tyvoiax',
//     number: '11-111-122',
//     id: 4
//   }
// ];

// route to homepage
app.get('/', (request, response) => {
  console.log('home page requested');
  response.send('<h1>Welcome to phonebook homepage</h1>');
});

// get all phonebooks
app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()));
  });
});

// get phone stats
// app.get('/api/info', (request, response) => {
//   response.send(`
//     <p>Phonebook has info for ${persons.length} people</p>
//     <p>${new Date().toString()}</p>
//   `);
// });

// get a phonebook
app.get('/api/persons/:id', (request, response) => {
  Phonebook.findById(request.params.id).then(person =>
    response.json(person.toJSON())
  );
});

// delete a phonebook
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  Phonebook.deleteOne({ _id: id }).then(res => response.status(204).end());
});

// add a phonebook
app.post('/api/persons', (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response
      .status(400)
      .json({ error: 'name or number cannot be empty' });
  }
  // if (persons.some(person => person.name === body.name)) {
  //   return response.status(400).json({ error: 'name must be unique' });
  // }
  const person = new Phonebook({
    name: body.name,
    number: body.number
  });
  person.save().then(savedPerson => response.json(savedPerson.toJSON()));
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
