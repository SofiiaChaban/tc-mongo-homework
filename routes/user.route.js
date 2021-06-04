const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const validator = require('express-joi-validation').createValidator({})


router.post('/',validator.body(userController.userSchema), userController.createUser);

router
    .delete('/:userId', validator.params(userController.idSchema), userController.removeUser)
    .put('/:userId', validator.params(userController.idSchema),validator.body(userController.updateUserSchema), userController.updateUser)
    .get('/:userId', validator.params(userController.idSchema), userController.getUser)
    .get('/:userId/articles', validator.params(userController.idSchema), userController.getUserArticles)

module.exports = router;