var loginDetails = {
  $jsonSchema: {
    bsonType: "object",
    required: ["_id", "password"],
    properties: {
      _id: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      password: {
        bsonType: "string",
        description: "must be a string and is required",
      },
    },
  },
};
