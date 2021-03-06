import { Router } from 'express';
import validate from 'express-validation';

import * as userController from './user.controllers';
import userValidation from './user.validation';
import { authLocal } from '../../services/auth.service';

const routes = new Router();

routes.post('/signup', validate(userValidation.signUp), userController.signUp);
routes.post('/login', authLocal, userController.login);

export default routes;
