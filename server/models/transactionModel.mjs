import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      description: 'must be a string and is required',
    },
    userId: {
      type: String,
      required: true,
      description: 'must be a string and is required',
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'verified', 'rejected'],
      description: 'must be a string enum and is required',
    },
    transactionDate:{
      type:String,
      required:true,
      description: 'must be a string and is required',
    },
    updatedDate:{
      type:String,
      required:false,
      description: 'must be a string and is required',
    },permitId:{
      type: String,
          enum: ['p1', 'p2', 'p3', 'p4'],
          required: true,
          description: 'must be a string enum and is required',
    },
    paymentType:{
      type: String,
      required: true,
      description: 'must be a string and is required',
    },
    screenShotSent:{
      type: Boolean,
      required: true,
      description: 'must be a boolean and is required',
    },
    validity: {
      type: String,
      description: 'must be a string and is required',
    },
  },
  {
    strict: true,
    validateBeforeSave: 'error',
  },
)

const Transaction = mongoose.model('Transaction', transactionSchema, 'transactions')

export default Transaction
