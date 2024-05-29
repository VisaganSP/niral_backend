import mongoose from 'mongoose';

// Define the schema for the admin using Mongoose Schema constructor
const adminSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    description: 'must be a string and is required',
  },
  adminName: {
    type: String,
    required: true,
    description: 'must be a string and is required',
  },
  adminPassword: {
    type: String,
    required: true,
    description: 'must be a string and is required',
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    description: 'must be a number and is required',
  },
  permissions: {
    type: new mongoose.Schema({
      manageNewAdmins: {
        type: Boolean,
        required: true,
        description: 'must be a bool and is required',
      },
      manageParticipants: {
        type: Boolean,
        required: true,
        description: 'must be a bool and is required',
      },
      manageResults: {
        type: Boolean,
        required: true,
        description: 'must be a bool and is required',
      },
      manageEventRegistrations: {
        type: Boolean,
        required: true,
        description: 'must be a bool and is required',
      },
      managePaymentStatus: {
        type: Boolean,
        required: true,
        description: 'must be a bool and is required',
      },
      eventRightsGiven: {
        type: new mongoose.Schema({
          event1: {
            type: Boolean,
            required: true,
            description: 'must be a bool and is required',
          },
          event2: {
            type: Boolean,
            required: true,
            description: 'must be a bool and is required',
          },
          event3: {
            type: Boolean,
            required: true,
            description: 'must be a bool and is required',
          },
          event4: {
            type: Boolean,
            required: true,
            description: 'must be a bool and is required',
          },
          event5: {
            type: Boolean,
            required: true,
            description: 'must be a bool and is required',
          },
          event6: {
            type: Boolean,
            required: true,
            description: 'must be a bool and is required',
          },
          event7: {
            type: Boolean,
            required: true,
            description: 'must be a bool and is required',
          },
          event8: {
            type: Boolean,
            required: true,
            description: 'must be a bool and is required',
          },
          event9: {
            type: Boolean,
            required: true,
            description: 'must be a bool and is required',
          },
          event10: {
            type: Boolean,
            required: true,
            description: 'must be a bool and is required',
          },
          event11: {
            type: Boolean,
            required: true,
            description: 'must be a bool and is required',
          },
          event12: {
            type: Boolean,
            required: true,
            description: 'must be a bool and is required',
          },
          event13: {
            type: Boolean,
            required: true,
            description: 'must be a bool and is required',
          },
          workshop1: {
            type: Boolean,
            required: true,
            description: 'must be a bool and is required',
          },
        }),
        required: true,
        description: 'must be an object and is required',
      },
    }),
    required: true,
    description: 'must be an object and is required',
  },
}, {
  strict: true, // Enforce strict schema validation
});

// Create the Admin model using the schema
const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

export default Admin;
