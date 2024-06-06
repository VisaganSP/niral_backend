import mongoose from 'mongoose';

// Define the Query schema
const querySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  }
});

// Define the Collaborate schema
const collaborateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  org: {
    type: String,
    required: true
  }
});

// Define the Contact schema containing query and collaborate arrays
const contactSchema = new mongoose.Schema({
  query: [querySchema],
  collaborate: [collaborateSchema]
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
