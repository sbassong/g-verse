const Router = require('express').Router();
const controller = require('../controllers/UserController');
const middleware = require('../middleware');

Router.get('/', controller.GetProfiles);
Router.get('/session', middleware.stripToken, middleware.verifyToken, controller.CheckSession);
Router.get('/:user_id', controller.GetUserProfile);

Router.post('/', controller.SignUp);
Router.post('/login', controller.Login);
// Router.post('/:user_id/update', middleware.stripToken, middleware.verifyToken, controller.UpdatePassword);

Router.put('/:user_id/update', middleware.stripToken, middleware.verifyToken, controller.UpdateUser);
Router.put('/:user_id/favorites/update', controller.UpdateUserFavorites);

Router.delete('/:user_id/delete', controller.DeleteUser);

module.exports = Router
