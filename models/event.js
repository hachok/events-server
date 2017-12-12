const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    tags: [{
        type: String
    }],
    image: {
        type: String
    },
    description: {
        type: String
    }
});

let Event = module.exports = mongoose.model('Event', eventSchema);