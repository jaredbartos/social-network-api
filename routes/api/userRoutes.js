const router = require('express').Router();
const { getAllUsers, getSingleUser } = require('../../controllers/userController')

// /api/users
router.route('/').get(getAllUsers);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);

module.exports = router;