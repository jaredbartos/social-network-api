const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser
} = require('../../controllers/userController')

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser);

module.exports = router;