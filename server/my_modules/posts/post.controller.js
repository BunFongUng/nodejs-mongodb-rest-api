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