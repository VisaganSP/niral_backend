// logModel.mjs
import mongoose from 'mongoose';

const logSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["_id", "timestamp", "adminId", "activity", "affectedUserId"],
    properties: {
      _id: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      adminId: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      activity: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      affectedUserId: {
        bsonType: "string",
        description: "must be a string",
      },
    },
  },
};

const LogModel = mongoose.model('Log', logSchema);

export default LogModel;
