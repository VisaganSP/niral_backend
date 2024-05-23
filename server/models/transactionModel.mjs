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
    date: {
      type: String,
      required: true,
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
