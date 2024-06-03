import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      description: 'must be a string and is required',
    },
    details: {
      type: {
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
        rollNo: { type: String, description: 'must be a string' },
        dateOfBirth: {
          type: String,
          required: true,
          description: 'must be a string and is required',
        },
        department: { type: String, description: 'must be a string' },
        branch: { type: String, description: 'must be a string' },
        year: { type: String, description: 'must be a number' },
        password: {
          type: String,
          description: 'must be a string and is required',
        },
        college: { type: String, description: 'must be a string' },
        state: {
          type: String,
          description: 'must be a string and is required',
        },
        city: {
          type: String,
          description: 'must be a string and is required',
        },
        companyName: { type: String, description: 'must be a string' },
        experience: { type: Number, description: 'must be a number' },
      },
      required: true,
    },
    organization: {
      type: String,
      enum: ['cegian', 'other', 'professional'],
      required: true,
      description: 'must be a string enum and is required',
    },
    permit: {
      type: {
        p1: {
          status: {
            type: String,
            enum: ['applied', 'verified', 'rejected', 'none'],
            description: 'must be a string enum',
          },
          transactionId: {
            type: String,
            description: 'must be a string',
          },
          transactionDate:{
            type:String,
            description: 'must be a string',
          },
          updatedDate:{
            type:String,
            description: 'must be a string',
          }
        },
        p2: {
          status: {
            type: String,
            enum: ['applied', 'verified', 'rejected', 'none'],
            description: 'must be a string enum',
          },
          transactionId: {
            type: String,
            description: 'must be a string',
          },
          transactionDate:{
            type:String,
            description: 'must be a string',
          },
          updatedDate:{
            type:String,
            description: 'must be a string',
          }
        },
        p3: {
          status: {
            type: String,
            enum: ['applied', 'verified', 'rejected', 'none'],
            description: 'must be a string enum',
          },
          transactionId: {
            type: String,
            description: 'must be a string',
          },
          transactionDate:{
            type:String,
            description: 'must be a string',
          },
          updatedDate:{
            type:String,
            description: 'must be a string',
          }
        },
        p4: {
          status: {
            type: String,
            enum: ['applied', 'verified', 'rejected', 'none'],
            description: 'must be a string enum',
          },
          transactionId: {
            type: String,
            description: 'must be a string',
          },
          transactionDate:{
            type:String,
            description: 'must be a string',
          },
          updatedDate:{
            type:String,
            description: 'must be a string',
          }
        },
      },
    },
    paymentHistory: [
      {
        transactionDate:{
          type:String,
          required:true,
          description: 'must be a string and is required',
        },
        transactionId: {
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
      },
    ],
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
