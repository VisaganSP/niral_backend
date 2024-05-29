const adminSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['_id', 'adminName', 'adminPassword', 'level', 'permissions'],
    properties: {
      _id: {
        bsonType: 'string',
        description: 'must be a string and is required',
      },
      adminName: {
        bsonType: 'string',
        description: 'must be a string and is required',
      },
      adminPassword: {
        bsonType: 'string',
        description: 'must be a string and is required',
      },
      level: {
        bsonType: 'number',
        description: 'must be a number and is required',
        min:1,
      },
      permissions: {
        bsonType: 'object',
        required: [
          'manageNewAdmins',
          'manageParticipants',
          'manageResults',
          'manageEventRegistrations',
          'managePaymentStatus',
          'eventRightsGiven',
        ],
        properties: {
          manageNewAdmins: {
            bsonType: 'bool',
            description: 'must be a bool and is required',
          },
          manageParticipants: {
            bsonType: 'bool',
            description: 'must be a bool and is required',
          },
          manageResults: {
            bsonType: 'bool',
            description: 'must be a bool and is required',
          },
          manageEventRegistrations: {
            bsonType: 'bool',
            description: 'must be a bool and is required',
          },
          managePaymentStatus: {
            bsonType: 'bool',
            description: 'must be a bool and is required',
          },
          eventRightsGiven: {
            bsonType: 'object',
            required: [],
            properties: {
              event1: {
                bsonType: 'bool',
                description: 'must be a bool and is required',
              },
              event2: {
                bsonType: 'bool',
                description: 'must be a bool and is required',
              },
              event3: {
                bsonType: 'bool',
                description: 'must be a bool and is required',
              },
              event4: {
                bsonType: 'bool',
                description: 'must be a bool and is required',
              },
              event5: {
                bsonType: 'bool',
                description: 'must be a bool and is required',
              },
              event6: {
                bsonType: 'bool',
                description: 'must be a bool and is required',
              },
              event7: {
                bsonType: 'bool',
                description: 'must be a bool and is required',
              },
              event8: {
                bsonType: 'bool',
                description: 'must be a bool and is required',
              },
              event9: {
                bsonType: 'bool',
                description: 'must be a bool and is required',
              },
              event10: {
                bsonType: 'bool',
                description: 'must be a bool and is required',
              },
              event11: {
                bsonType: 'bool',
                description: 'must be a bool and is required',
              },
              event12: {
                bsonType: 'bool',
                description: 'must be a bool and is required',
              },
              event13: {
                bsonType: 'bool',
                description: 'must be a bool and is required',
              },
              workshop1: {
                bsonType: 'bool',
                description: 'must be a bool and is required',
              },
            },
          },
        },
      },
    },
  },
  strict: true, // Enforce strict schema validation
}