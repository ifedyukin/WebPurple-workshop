import express from 'express';
import checkToken from '../middlewares/checkToken';
import getUser from '../middlewares/getUser';

import * as PageController from '../controllers/page';

const router = express.Router();

router.get('/vk', PageController.getVk);
router.get('/pages', PageController.getAll);
router.get('/pages/:url', PageController.getPageByUrl);
router.post('/pages', checkToken, getUser, PageController.create);
router.patch('/pages/:id', checkToken, PageController.updatePage);
router.delete('/pages/:id', checkToken, PageController.deletePage);

export default router;
