import { ObjectID } from 'mongodb';

import Post from './post.model';

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