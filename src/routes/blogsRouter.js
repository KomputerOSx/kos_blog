import express from 'express';
import * as controllers from '../controllers/blogsController.js';

const router = express.Router();

router.get('/', controllers.getIndex);
router.get('/blogs', controllers.getBlogs);
router.get('/blogs/:id', controllers.getBlog);
router.get('/new', controllers.getNewBlogForm);
router.post('/new', controllers.createNewBlog);
router.delete('/blogs/:id', controllers.deleteBlog);
router.get('/edit/:id', controllers.getEditBlogForm);
router.put('/edit/:id', controllers.updateBlog);

export default router;
