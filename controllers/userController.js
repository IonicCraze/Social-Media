const {User, Thoughts} = require('../models');

const userController = {
    createUser(req,res){
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    deleteUser(req,res){

    },

    updateUser(req,res){

    },

    getOneUser(req,res){

    },
    getAllUsers(req,res){
        User.find()
        .select('-__v')
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    }
}



module.exports = userController;