import express from 'express';
import checkToken from '../middlewares/checkToken';

import * as DirectorController from '../controllers/director';

const router = express.Router();

router.get('/directors', DirectorController.getAll);
router.patch('/directors/:id', checkToken, DirectorController.updateDirector);
router.delete('/directors/:id', checkToken, DirectorController.deleteDirector);

export default router;