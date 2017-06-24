import { ObjectID } from 'mongodb';

import Post from './post.model';
import User from '../users/user.model';

export async function createPost(req, res) {
    try {
        // Visitability way
        // const post = await Post.create({...req.body, user: req.uer._id });

        // abstract way
        // console.log(req.user);
        const post = await Post.createPost(req.body, req.user._id);
        return res.status(200).json(post);
    } catch (e) {
        return res.status(400).json(e);
    }
}

export async function getPostById(req, res) {
    try {
        if(!ObjectID.isValid(req.params.id)) {
            return res.status(401).json({
                message: 'Invalid post id!'
            });
        }

        const post = await Post.findById(req.params.id).populate('user');

        if(!post) {
            return res.status(404).json({
                message: 'Post not found!'
            });
        }

        return res.status(200).json(post);
    } catch (e) {
        return res.status(400).json(e);
    }
}

export async function getPostList(req, res) {
    // console.log('query skip: ', req.query.skip);
    // console.log('query limit :', req.query.limit);

    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const posts = await Post.list({skip, limit});
        return res.status(200).json(posts);
    } catch (e) {
        return res.status(400).json(e);
    }
}

export async function updatePost(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        // if this post is not belong to the current user.
        if(!post.user.equals(req.user._id)) {
            return res.sendStatus(401);
        }

        Object.keys(req.body).forEach(key => {
            post[key] = req.body[key];
        });

        return res.status(200).json(await post.save());
    } catch (e) {
        return res.status(400).json(e);
    }
}

export async function deletePost(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        // if this post is not belong to the current user.
        if(!post.user.equals(req.user._id)) {
            return res.sendStatus(401);
        }

        await post.remove();

        return res.sendStatus(200);
    } catch (e) {
        return res.status(400).json(e);
    }
}

export async function favoritePost(req, res) {
  try {
    const user = await User.findById(req.user._id);
    await user._favorites.posts(req.params.id);
    return res.sendStatus(200);
  } catch (e) {
    return res.status(400).json(e);
  }
}
