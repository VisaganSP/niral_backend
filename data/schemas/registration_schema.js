var registrationSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["_id", "events", "workshops", "hackathons"],
    properties: {
      _id: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      events: {
        bsonType: "object",
        required: ["event1"],
        properties: {
          event1: {
            bsonType: "object",
            required: [
              "teamId",
              "noOfTeamMembers",
              "members",
              "round1Status",
              "round2Status",
            ],
            properties: {
              teamId: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              noOfTeamMembers: {
                bsonType: "number",
                description: "must be a number and is required",
              },
              members: {
                bsonType: "array",
                items: {
                  type: "string",
                },
                minItems: 1,
                maxItems: 2,
                uniqueItems: true,
              },
              round1Status: {
                bsonType: "bool",
                description: "must be a bool and is required",
              },
              round2Status: {
                bsonType: "string",
                enum: ["first", "second", "third", "none"],
                description: "must be a string enum and is required",
              },
            },
          },
        },
      },
      workshops: {
        bsonType: "object",
        required: ["workshop1", "hasAttended"],
        properties: {
          workshop1: {
            bsonType: "object",
            required: ["userId"],
            properties: {
              userId: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              hasAttended: {
                bsonType: "bool",
                description: "must be a bool and is required",
              },
            },
          },
        },
      },
      hackathons: {
        bsonType: "object",
        required: ["hackathon1"],
        properties: {
          hackathon1: {
            bsonType: "object",
            required: [
              "teamId",
              "noOfTeamMembers",
              "members",
              "round1Status",
              "round2Status",
            ],
            properties: {
              teamId: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              noOfTeamMembers: {
                bsonType: "number",
                description: "must be a number and is required",
              },
              members: {
                bsonType: "array",
                items: {
                  type: "string",
                },
                minItems: 1,
                maxItems: 3,
                uniqueItems: true,
              },
              round1Status: {
                bsonType: "bool",
                description: "must be a bool and is required",
              },
              round2Status: {
                bsonType: "string",
                enum: ["first", "second", "third", "none"],
                description: "must be a string enum and is required",
              },
            },
          },
        },
      },
    },
  },
};
