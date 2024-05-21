var loginDetails = {
  $jsonSchema: {
    bsonType: "object",
    required: ["_id", "password", "userId"],
    properties: {
      _id: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      password: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      userId:{
        bsonType: "string",
        description: "must be a string and is required",
      },
    },
  },
};
