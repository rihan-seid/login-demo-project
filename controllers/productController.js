const Product = require("../model/blog");
const baseUrl = process.env.BASE_URL;
const { StatusCodes } = require("http-status-codes");

const createPosts = async (req, res) => {
    try {
        const { name, description, category } = req.body;
        const pictures = req.files.map(file => baseUrl + "/uploads/" + file.filename);

        const newPost = await Product.create({
            name, description, category, image: pictures
        });

        res.status(StatusCodes.CREATED).json({ post: newPost });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Product.find();
        res.status(StatusCodes.OK).json({ posts });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

const getPostsById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Product.findById(id);
        if (!post) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Post not found' });
        }
        res.status(StatusCodes.OK).json({ post });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

module.exports = { createPosts, getAllPosts, getPostsById };
