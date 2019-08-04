const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message);
  });

const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    unique: true
  }
});

// Apply the uniqueValidator plugin to userSchema.
phoneBookSchema.plugin(uniqueValidator);

// format the objects returned by Mongoose
phoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

// create a model
module.exports = mongoose.model('PhoneBook', phoneBookSchema);

// if (process.argv.length === 3) {
//   PhoneBook.find({}).then(result => {
//     result.forEach(person => {
//       console.log(person);
//     });
//     mongoose.connection.close();
//   });
// }

// if (process.argv.length === 5) {
//   const person = new PhoneBook({
//     name: process.argv[3],
//     number: process.argv[4]
//   });

//   person.save().then(response => {
//     console.log(`added ${response.name} ${response.number} to phonebook`);
//     console.log('response:', response);
//     mongoose.connection.close();
//   });
// }
