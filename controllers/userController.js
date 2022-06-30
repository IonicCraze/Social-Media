const {User, Thoughts} = require('../models');

const userController = {
    createUser(req,res){
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    deleteUser(req,res){
        User.findOneAndRemove({_id: req.params.id})
            .then((user) => 
            User.findOneAndUpdate({_id: req.params.id}, {$pull: {_id: req.params.id}}, {new: true})) 
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },

    updateUser(req,res){
        User.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {runValidators: true})
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));

    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
          .select('-__v')
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user))
          .catch((err) => res.status(500).json(err));
      },

    getOneUser(req,res){
        User.findOne({_id: req.params.id})
            .select('__v')
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json(err));
    },
    getAllUsers(req,res){
        User.find()
        .select('-__v')
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },
}



module.exports = userController;