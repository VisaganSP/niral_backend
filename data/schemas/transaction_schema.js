var transactionSchema = {validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "userId", "status"],
      properties: {
        _id: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        userId: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        status: {
            bsonType: "bool",
            description: "must be a bool and is required"
          }
      }
    }
  }}