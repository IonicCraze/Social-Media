const router = require('express').Router();

const {
    createUser,
    deleteUser,
    updateUser,
    getSingleUser,
    getAllUsers,
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;