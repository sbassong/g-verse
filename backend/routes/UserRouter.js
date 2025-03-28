const Router = require('express').Router();
const controller = require('../controllers/UserController');
const middleware = require('../middleware');

Router.get('/', controller.GetProfiles);
Router.get('/session', middleware.stripToken, middleware.verifyToken, controller.CheckSession);
Router.get('/:userId', controller.GetUserProfile);

Router.post('/', controller.SignUp);
Router.post('/signin', controller.SignIn);
Router.post('/signout', controller.SignOut);

Router.put('/:userId/password/update', middleware.stripToken, middleware.verifyToken, controller.UpdatePassword);
Router.put('/:userId/profile/update', middleware.stripToken, middleware.verifyToken, controller.UpdateUser);
Router.put('/:userId/favorites/update', middleware.stripToken, middleware.verifyToken, controller.UpdateUserFavorites);

Router.delete('/:userId/delete', controller.DeleteUser);

module.exports = Router;
