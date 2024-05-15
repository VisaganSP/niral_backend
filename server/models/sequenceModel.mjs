// Import mongoose
import mongoose from "mongoose";

// Create a Mongoose schema based on the JSON schema
const sequenceSchema = new mongoose.Schema({
  otherCollege: {
    type: String,
    required: true,
    description: "must be a string and is required",
  },
  workingProfessional: {
    type: String,
    required: true,
    description: "must be a string and is required",
  },
});

// Create the Mongoose model
const SequenceModel = mongoose.model("Sequences", sequenceSchema, "sequences");

export default SequenceModel;
