import * as db from "../models/database.js";

export const getIndex = (req, res) => {
    res.render('index');
};

export const getBlogs = async (req, res) => {
    const blogs = await db.getBlogs();
    res.send(blogs);
};

export const getBlog = async (req, res) => {
    const id = req.params.id;
    const blog = await db.getBlog(id);
    if (blog) {
        console.log(blog);
        res.render('show', {blog});
    } else {
        res.status(404).send('Blog not found');
    }
};

export const getNewBlogForm = (req, res) => {
    res.render('new');
};

export const createNewBlog = async (req, res) => {
    try {
        const request = req.body;
        await db.newBlog(request);
        console.log(request);
        res.status(200).send(req.body.age);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error creating new blog');
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const id = req.params.id;
        await db.deleteBlog(id);
        res.status(200).send('Blog deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting blog');
    }
};

export const getEditBlogForm = async (req, res) => {
    const id = req.params.id;
    const blog = await db.getBlog(id);
    blog.content = db.remove_formatWithBreaks(blog.content);
    res.render('edit', {blog});
};

export const updateBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const content = db.formatWithBreaks(req.body.content);
        const title = req.body.title;
        await db.updateBlog(id, title, content);
        res.status(200).send('Blog Updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating blog');
    }
};
