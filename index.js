if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
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

//get phone stats
app.get('/api/info', (request, response) => {
  Phonebook.estimatedDocumentCount((error, count) => {
    console.log('num of phonebook:', count);
    response.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date().toString()}</p>
    `);
  });
});

// get a phonebook
app.get('/api/persons/:id', (request, response, next) => {
  Phonebook.findById(request.params.id)
    .then(person => {
      console.log(person);

      if (person) {
        response.json(person.toJSON());
      } else {
        response.status(204).end();
      }
    })
    .catch(error => next(error));
});

// delete a phonebook
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  Phonebook.deleteOne({ _id: id })
    .then(res => response.status(204).end())
    .catch(error => next(error));
});

// add a phonebook
app.post('/api/persons', (request, response, next) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response
      .status(400)
      .json({ error: 'name or number cannot be empty' });
  }
  // if (persons.some(person => person.name === body.name)) {
  //   return response.status(400).json({ error: 'name must be unique' });
  // }

  Phonebook.find({ name: body.name }, (error, docs) => {
    console.log('error:', error);
    console.log('docs matching:', docs);

    // update number if name exist
    if (docs.length !== 0) {
      const id = docs[0]._id;
      const phonebook = {
        name: docs[0].name,
        number: body.number
      };
      Phonebook.findByIdAndUpdate(id, phonebook, { new: true })
        .then(updatedPerson => {
          response.json(updatedPerson.toJSON());
        })
        .catch(error => next(error));
    } else {
      const person = new Phonebook({
        name: body.name,
        number: body.number
      });
      person
        .save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormattedPerson => response.json(savedAndFormattedPerson))
        .catch(error => next(error));
    }
  });
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const phonebook = {
    name: body.name,
    number: body.number
  };

  Phonebook.findByIdAndUpdate(request.params.id, phonebook, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON());
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
