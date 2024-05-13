var eventSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["_id", "events", "hackathons"],
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
            required: ["round1Qualifiers", "round2Qualifiers"],
            properties: {
              round1Qualifiers: {
                bsonType: "array",
                required: [],
                items: {
                  type: "string",
                },
                minItems: 0,
                maxItems: 2,
                uniqueItems: "true",
              },
              round2Qualifiers: {
                bsonType: "object",
                required: ["first", "second", "third", "none"],
                properties: {
                  first: {
                    bsonType: "string",
                    description: "must be a string and is required",
                  },
                  second: {
                    bsonType: "string",
                    description: "must be a string and is required",
                  },
                  third: {
                    bsonType: "string",
                    description: "must be a string and is required",
                  },
                  none: {
                    bsonType: "string",
                    description: "must be a string and is required",
                  },
                },
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
            required: ["round1Qualifiers", "round2Qualifiers"],
            properties: {
              round1Qualifiers: {
                bsonType: "array",
                required: [],
                items: {
                  type: "string",
                },
                minItems: 0,
                maxItems: 2,
                uniqueItems: "true",
              },
              round2Qualifiers: {
                bsonType: "object",
                required: ["first", "second", "third", "none"],
                properties: {
                  first: {
                    bsonType: "string",
                    description: "must be a string and is required",
                  },
                  second: {
                    bsonType: "string",
                    description: "must be a string and is required",
                  },
                  third: {
                    bsonType: "string",
                    description: "must be a string and is required",
                  },
                  none: {
                    bsonType: "string",
                    description: "must be a string and is required",
                  },
                },
              },
            },
          },
        },
      },
      // workshop: {
      //   bsonType: "object",
      //   required: ["workshop1"],
      //   properties: {
      //     workshop: {
      //       bsonType: "object",
      //       required: ["round1Qualifiers", "round2Qualifiers"],
      //       properties: {
      //         round1Qualifiers: {
      //           bsonType: "array",
      //           required: [],
      //           items: {
      //             type: "string",
      //           },
      //           minItems: 0,
      //           maxItems: 2,
      //           uniqueItems: "true",
      //         },
      //         round2Qualifiers: {
      //           bsonType: "object",
      //           required: ["first", "second", "third", "none"],
      //           properties: {
      //             first: {
      //               bsonType: "string",
      //               description: "must be a string and is required",
      //             },
      //             second: {
      //               bsonType: "string",
      //               description: "must be a string and is required",
      //             },
      //             third: {
      //               bsonType: "string",
      //               description: "must be a string and is required",
      //             },
      //             none: {
      //               bsonType: "string",
      //               description: "must be a string and is required",
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },
      // },
    },
  },
};
