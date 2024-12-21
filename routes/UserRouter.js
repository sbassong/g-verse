const Router = require('express').Router();
const controller = require('../controllers/UserController');
const middleware = require('../middleware');

Router.get('/', controller.GetProfiles);
Router.get('/:user_id', controller.GetUserProfile);
// Router.get('/session', middleware.stripToken, middleware.verifyToken, controller.CheckSession);

Router.post('/', controller.SignUp);
Router.post('/login', controller.Login);

Router.put('/:user_id/password/update', middleware.stripToken, middleware.verifyToken, controller.UpdatePassword);
Router.put('/:user_id/profile/update', middleware.stripToken, middleware.verifyToken, controller.UpdateUser);
Router.put('/:user_id/favorites/update', middleware.stripToken, middleware.verifyToken, controller.UpdateUserFavorites);

Router.delete('/:user_id/delete', controller.DeleteUser);

module.exports = Router;
