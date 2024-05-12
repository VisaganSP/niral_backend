// src/models/participantModel.mjs

import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  details: {
    type: {
      emailId: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String },
      mobileNo: { type: String, required: true },
      rollNo: { type: String },
      dateOfBirth: { type: Date, required: true },
      department: { type: String },
      branch: { type: String },
      year: { type: Number },
      password: { type: String, required: true },
      college: { type: String },
      state: { type: String, required: true },
      city: { type: String, required: true },
      companyName: { type: String },
      experience: { type: Number },
    },
    required: true,
  },
  organization: {
    type: String,
    enum: ["cegian", "other", "professional"],
    required: true,
  },
  permit: {
    type: {
      pass1: { type: Boolean, required: true },
      pass2: { type: Boolean, required: true },
      pass3: { type: Boolean, required: true },
    },
    required: true,
  },
  paymentHistory: {
    type: {
      transactionId: { type: String, required: true },
      upiId: { type: String, required: true },
    },
    required: true,
  },
  eventsPoints: {
    type: Number,
    required: true,
  },
});

const Participant = mongoose.model("Participant", participantSchema);

export default Participant;
