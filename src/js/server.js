import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

import {getBlogs, getBlog, newBlog, deleteBlog, remove_formatWithBreaks, updateBlog, formatWithBreaks} from "./database.js";

import expressLayouts from 'express-ejs-layouts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.json());
app.use(express.static('src'));
app.use(expressLayouts);
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/blogs', async (req, res) => {
    const blogs = await getBlogs();
    res.send(blogs);
})

app.get('/blog/:id', async (req, res) => {
    const id = req.params.id;
    const blog = await getBlog(id);
    if (blog) {
        console.log(blog);
        res.render('show', {blog});
    } else {
        res.status(404).send('Blog not found');
    }
})



app.get('/new', (req, res) => {
    res.render('new')
})


app.post('/new', async (req, res) => {
    try{
        const request = req.body
        await newBlog(request)
        console.log(request)

        res.status(200).send(req.body.age)
    }
    catch (error) {
        console.log(error)
        res.status(500)
    }
})


app.delete('/blog/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await deleteBlog(id);
        res.status(200).send('Blog deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting blog');
    }
});


app.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const blog = await getBlog(id);
    blog.content = remove_formatWithBreaks(blog.content)
    res.render('edit', {blog});
});

app.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const content = formatWithBreaks(req.body.content);
        const title = req.body.title;
        await updateBlog(id, title, content);
        res.status(200).send('Blog Updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating blog');
    }
});





app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


