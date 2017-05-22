import { Router } from 'express';
import * as userController from './user.controllers';

const routes = new Router();

routes.post('/signup', userController.signUp);

export default routes;
