const {User, Thoughts, reactionSchema} = require('../models');

const thoughtController = {
    createThought(req,res){
        Thoughts.create(req.body)
    .then((data) => {
        return User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: { thoughts: data._id } },
            { new: true }
        );
    })
    .then((user) =>
        !user
            ? res.status(404).json({
            message: 'Thought created, but found no user with that ID',
            })
        : res.json('Created the thought')
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},

    deleteThought(req,res){
        Thoughts.findOneAndRemove({_id: req.params.id})
            .then((user) => 
            Thoughts.findOneAndUpdate({_id: req.params.id}, {$pull: {_id: req.params.id}}, {new: true})) 
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },

    updateThought(req,res){
        Thoughts.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {runValidators: true})
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));

    },
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.id })
            .select('-__v')
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(user))
            .catch((err) => res.status(500).json(err));
        },

    getOneThought(req,res){
        Thoughts.findOne({_id: req.params.id})
            .select('__v')
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json(err));
    },
    getAllThoughts(req,res){
        Thoughts.find()
        .select('-__v')
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },
    addReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
            .then((video) =>
            !video
                ? res.status(404).json({ message: 'No video with this id!' })
                : res.json(video)
        )
        .catch((err) => res.status(500).json(err));
    },
      // Remove video response
    deleteReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        )
            .then((video) =>
            !video
                ? res.status(404).json({ message: 'No video with this id!' })
                : res.json(video)
        )
            .catch((err) => res.status(500).json(err));
    },
}



module.exports = thoughtController;