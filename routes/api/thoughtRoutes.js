const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought);

module.exports = router;