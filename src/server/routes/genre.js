import express from 'express';
import checkToken from '../middlewares/checkToken';

import * as GenreController from '../controllers/genre';

const router = express.Router();

router.get('/genres', GenreController.getAll);
router.patch('/genres/:id', checkToken, GenreController.updateGenre);
router.delete('/genres/:id', checkToken, GenreController.deleteGenre);

export default router;