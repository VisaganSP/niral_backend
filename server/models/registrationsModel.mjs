// registrationSchema.mjs

import mongoose from 'mongoose';

const { Schema } = mongoose;


const eventSchema = new Schema({
    teamId: {
        type: String,
        required: true
    },
    noOfTeamMembers: {
        type: Number,
        required: true
    },
    members: {
        type: [String],
        required: true,
        validate: {
            validator: function(v) {
                return v.length >= 1 && v.length <= 2 && new Set(v).size === v.length;
            },
            message: props => `${props.path} must contain between 1 and 2 unique items`
        }
    },
    round1Status: {
        type: Boolean,
        required: true
    },
    round2Status: {
        type: String,
        enum: ['first', 'second', 'third', 'none'],
        required: true
    }
});

const workshopSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    hasAttended: {
        type: Boolean,
        required: true
    }
});

const hackathonSchema = new Schema({
    teamId: {
        type: String,
        required: true
    },
    noOfTeamMembers: {
        type: Number,
        required: true
    },
    members: {
        type: [String],
        required: true,
        validate: {
            validator: function(v) {
                return v.length >= 1 && v.length <= 3 && new Set(v).size === v.length;
            },
            message: props => `${props.path} must contain between 1 and 3 unique items`
        }
    },
    round1Status: {
        type: Boolean,
        required: true
    },
    round2Status: {
        type: String,
        enum: ['first', 'second', 'third', 'none'],
        required: true
    }
});

const registrationSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    events: {
        type: Map,
        of: eventSchema
    },
    workshops: {
        type: Map,
        of: workshopSchema
    },
    hackathons: {
        type: Map,
        of: hackathonSchema
    }
}, { strict: true }); 

export default mongoose.model('Registration', registrationSchema);
