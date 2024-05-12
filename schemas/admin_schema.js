var adminSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: [
      "_id",
      "adminName",
      "adminRollno",
      "adminPassword",
      "permissions",
    ],
    properties: {
      _id: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      adminName: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      adminRollno: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      adminPassword: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      permissions: {
        bsonType: "object",
        required: [
          "manageNewAdmins",
          "manageParticipants",
          "manageResults",
          "manageEventRegistrations",
          "managePaymentStatus",
          "eventRightsGiven",
        ],
        properties: {
          manageNewAdmins: {
            bsonType: "bool",
            description: "must be a bool and is required",
          },
          manageParticipants: {
            bsonType: "bool",
            description: "must be a bool and is required",
          },
          manageResults: {
            bsonType: "bool",
            description: "must be a bool and is required",
          },
          manageEventRegistrations: {
            bsonType: "bool",
            description: "must be a bool and is required",
          },
          managePaymentStatus: {
            bsonType: "bool",
            description: "must be a bool and is required",
          },
          eventRightsGiven: {
            bsonType: "object",
            required: ["event1", "event2", "event3"],
            properties: {
              event1: {
                bsonType: "bool",
                description: "must be a bool and is required",
              },
              event2: {
                bsonType: "bool",
                description: "must be a bool and is required",
              },
              event3: {
                bsonType: "bool",
                description: "must be a bool and is required",
              },
            },
          },
        },
      },
    },
  },
};
