// external package imports
import { Router } from 'express';
import validate from 'express-validation';

// internal imports
import * as postController from './post.controller';
import { authJwt } from '../../services/auth.service';
import postValidation from './post.validation';

const routes = new Router();

routes.post('/', authJwt, validate(postValidation.createPost) , postController.createPost);

export default routes;