const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
app.use(bodyParser.json());

morgan.token('data', (request, response) => {
  return JSON.stringify(request.body);
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));


let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'tyvoiax',
    number: '11-111-122',
    id: 4
  }
];

// route to homepage
app.get('/', (request, response) => {
  console.log('home page requested');
  response.send('<h1>Welcome to phonebook homepage</h1>');
});

// get all phonebooks
app.get('/api/persons', (request, response) => {
  response.json(persons);
});

// get phone stats
app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date().toString()}</p>
  `);
});

// get a phonebook
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// delete a phonebook
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);
  response.status(204).end();
});

// id generator
const generateId = () => {
  let id = Math.ceil(Math.random() * 200);
  while (persons.some(person => person.id === id)) {
    id = Math.ceil(Math.random() * 200);
  }
  return id;
};

// add a phonebook
app.post('/api/persons', (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response
      .status(400)
      .json({ error: 'name or number cannot be empty' });
  }
  if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({ error: 'name must be unique' });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  };
  persons = persons.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
