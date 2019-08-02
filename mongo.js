const mongoose = require('mongoose');

// exit if no password provided
if (process.argv.length < 3) {
  console.log('give password as argument');
  console.log(`
  USAGE:
  node filename password name number - add entry to database
  node filename password - prints all entries
  `);
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://tyvoiax:${password}@cluster0-zgqho.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String
});

const PhoneBook = mongoose.model('PhoneBook', phoneBookSchema);

if (process.argv.length === 3) {
  PhoneBook.find({}).then(result => {
    result.forEach(person => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length === 5) {
  const person = new PhoneBook({
    name: process.argv[3],
    number: process.argv[4]
  });

  person.save().then(response => {
    console.log(`added ${response.name} ${response.number} to phonebook`);
    console.log('response:', response);
    mongoose.connection.close();
  });
}
