var sequenceDetails = {
    $jsonSchema: {
      bsonType: "object",
      required: ["otherCollege", "workingProfessional"],
      properties: {
        otherCollege: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        workingProfessional: {
          bsonType: "string",
          description: "must be a string and is required",
        },
      },
    },
  };
  