var participantsSchema = {
  $jsonSchema: {
    bsonType: 'object',
    required: [
      '_id',
      'details',
      'organization',
      // "permit",
      // "paymentHistory",
      // "eventsPoints",
    ],
    properties: {
      _id: {
        bsonType: 'string',
        description: 'must be a string and is required',
      },
      details: {
        bsonType: 'object',
        required: [
          'emailId',
          'firstName',
          'lastName',
          'mobileNo',
          'dateOfBirth',
          'password',
          // "state",
          // "city",
        ],
        properties: {
          emailId: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          firstName: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          lastName: {
            bsonType: 'string',
            description: 'must be a string',
          },
          mobileNo: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          rollNo: {
            bsonType: 'string',
            description: 'must be a string',
          },
          dateOfBirth: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          department: {
            bsonType: 'string',
            description: 'must be a string',
          },
          branch: {
            bsonType: 'string',
            description: 'must be a string',
          },
          year: {
            bsonType: 'string',
            description: 'must be a number',
          },
          password: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          college: {
            bsonType: 'string',
            description: 'must be a string',
          },
          state: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          city: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          companyName: {
            bsonType: 'string',
            description: 'must be a string',
          },
          experience: {
            bsonType: 'number',
            description: 'must be a number',
          },
        },
      },
      organization: {
        bsonType: 'string',
        enum: ['cegian', 'other', 'professional'],
        description: 'must be a string enum and is required',
      },
      permit: {
        bsonType: 'object',
        required: [],
        properties: {
          p1: {
            bsonType: 'object',
            required: ['transactionId', 'status'],
            properties: {
              transactionId: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
              status: {
                bsonType: 'string',
                description: 'must be a string enum and is required',
                enum: ['applied', 'verified', 'rejected'],
              },
            },

            //   pass2: {
            //     bsonType: "string",
            //     enum:["applied", "verified","rejected","none" ],
            //     description: "must be a string enum and is required",
            //   },
            //   pass3: {
            //     bsonType: "string",
            //     enum:["applied", "verified","rejected","none" ],
            //     description: "must be a string enum and is required",
          },
        },
      },
      paymentHistory: {
        bsonType: 'object',
        required: ['transactionId', 'status'],
        properties: {
          transactionId: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          status: {
            bsonType: 'bool',
            description: 'must be a bool and is required',
          },
        },
      },
      eventsPoints: {
        bsonType: 'number',
        description: 'must be a number and is required',
      },
    },
  },
}
