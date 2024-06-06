import mongoose from 'mongoose';

const permitSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: ['applied', 'verified', 'rejected', 'none'],
    description: 'must be a string enum and is required',
  },
  transactionId: {
    type: String,
    required: function () {
      return this.status === 'verified' || this.status === 'applied' || this.status === 'rejected';
    },
    description: 'must be a string and is required',
  },
  transactionDate: {
    type: String,
    required: function () {
      return this.status === 'verified' || this.status === 'applied' || this.status === 'rejected';
    },
    description: 'must be a string and is required',
  },
  updatedDate: {
    type: String,
    description: 'must be a string and is required',
  },
  validity: {
    type: String,
    description: 'must be a string and is required',
  },
  paymentType: {
    type: String,
      required: function () {
        return this.status === 'verified' || this.status === 'applied' || this.status === 'rejected';
      },
    description: 'must be a string and is required',
  },
});

const paymentHistorySchema = new mongoose.Schema({
  transactionDate: {
    type: String,
    required: true,
    description: 'must be a string and is required',
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    required: true,
    description: 'must be a string enum and is required',
  },
  updatedDate: {
    type: String,
    description: 'must be a string and is required',
  },
  paymentType: {
    type: String,
    required: true,
    description: 'must be a string and is required',
  },
});

const participantSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      description: 'must be a string and is required',
    },
    details: {
      emailId: {
        type: String,
        required: true,
        unique: true,
        description: 'must be a string and is required',
      },
      firstName: {
        type: String,
        required: true,
        description: 'must be a string and is required',
      },
      lastName: {
        type: String,
        required: true,
        description: 'must be a string and is required',
      },
      mobileNo: {
        type: String,
        required: true,
        description: 'must be a string and is required',
      },
      rollNo: {
        type: String,
        description: 'must be a string',
      },
      dateOfBirth: {
        type: String,
        required: true,
        description: 'must be a string and is required',
      },
      department: {
        type: String,
        description: 'must be a string',
      },
      branch: {
        type: String,
        description: 'must be a string',
      },
      year: {
        type: String,
        description: 'must be a string',
      },
      // password: {
      //   type: String,
      //   required: true,
      //   description: 'must be a string and is required',
      // },
      college: {
        type: String,
        description: 'must be a string',
      },
      state: {
        type: String,
        // required: true,
        description: 'must be a string and is required',
      },
      city: {
        type: String,
        // required: true,
        description: 'must be a string and is required',
      },
      companyName: {
        type: String,
        description: 'must be a string',
      },
      experience: {
        type: Number,
        description: 'must be a number',
      },
    },
    organization: {
      type: String,
      enum: ['cegian', 'other', 'professional'],
      required: true,
      description: 'must be a string enum and is required',
    },
    permit: {
      p1: permitSchema,
      p2: permitSchema,
      p3: permitSchema,
      p4: permitSchema,
    },
    paymentHistory: {
      type: Map,
      of: paymentHistorySchema,
      required: true,
      default: {}, 
      validate: {
        validator: function (value) {
          // Validate each document inside paymentHistory
          for (const [transactionId, transaction] of value.entries()) {
            if (
              !transaction.transactionDate ||
              !transaction.status ||
              typeof transaction.transactionDate !== 'string' ||
              !['pending', 'verified', 'rejected'].includes(transaction.status)
            ) {
              return false; // Invalid transaction structure
            }
          }
          return true;
        },
        message: props => `Invalid payment history document: ${props.value}`,
      },
    },
    eventsPoints: {
      type: Number,
      description: 'must be a number and is required',
    },
  },
  {
    strict: true,
    validateBeforeSave: 'error',
  },
);

const Participant = mongoose.model('Participant', participantSchema, 'participants');

export default Participant;
