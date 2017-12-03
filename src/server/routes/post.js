import express from 'express';
import checkToken from '../middlewares/checkToken';
import getUser from '../middlewares/getUser';

import * as PostController from '../controllers/post';

const router = express.Router();

router.get('/vk', PostController.getVk);
router.get('/posts', PostController.getAll);
router.get('/posts/:url', PostController.getPostByUrl);
router.post('/posts', checkToken, getUser, PostController.create);
router.patch('/posts/:id', checkToken, PostController.updatePost);
router.delete('/posts/:id', checkToken, PostController.deletePost);

export default router;
