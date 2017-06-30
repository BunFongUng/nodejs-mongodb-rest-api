// external package imports
import { Router } from 'express';
import validate from 'express-validation';

// internal imports
import * as postController from './post.controller';
import { authJwt } from '../../services/auth.service';
import postValidation from './post.validation';

const routes = new Router();

routes.get('/', authJwt, postController.getPostList);

routes.post('/', authJwt, validate(postValidation.createPost) , postController.createPost);

routes.get('/:id', authJwt, postController.getPostById);

routes.patch('/:id', authJwt, validate(postValidation.updatePost), postController.updatePost);

routes.delete('/:id', authJwt, postController.deletePost);

// favorites
routes.post('/:id/favorite', authJwt, postController.favoritePost);

export default routes;
