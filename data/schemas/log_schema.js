var logSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["_id", "timestamp", "adminId", "activity"],
    properties: {
      _id: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      timestamp: {
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
    },
  },
};
