const router = require('express').Router();

const {
    createThought,
    deleteThought,
    updateThought,
    getOneThought,
    getAllThoughts,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:id').get(getOneThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/react').post(addReaction);

router.route('/:thoughtId/:reactionId').delete(deleteReaction);

module.exports = router;