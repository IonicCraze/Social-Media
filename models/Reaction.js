const {Schema, model, Types} = require('mongoose');

const reactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        max_length: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    },
    {
    toJSON: {
        getters: true,
    },
    }
);

const User = model('reaction', reactionSchema);

module.exports = Reaction;