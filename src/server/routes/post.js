import express from 'express';
import checkToken from '../middlewares/checkToken';
import getUser from '../middlewares/getUser';

import * as PostController from '../controllers/post';

const router = express.Router();

router.get('/vk', PostController.getVk);
router.get('/posts/:url', PostController.getPostByUrl);
router.post('/posts', checkToken, getUser, PostController.create);
// Здесь нужно описывать конфигурацию роутов

export default router;
