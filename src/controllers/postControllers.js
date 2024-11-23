import getPosts from "../models/postModels.js";

export async function listarPosts( req, res ){
    const posts = await getPosts();

    res.status(200).json(posts);
}
