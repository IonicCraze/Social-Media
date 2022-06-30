const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtsSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        max_length: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
       },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
    },
    {
    toJSON: {
        getters: true,
    },
    }
);

thoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;