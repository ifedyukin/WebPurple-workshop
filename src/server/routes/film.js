import express from 'express';
import checkToken from '../middlewares/checkToken';

import * as FilmController from '../controllers/film';

const router = express.Router();

router.get('/films', FilmController.getAll);
router.patch('/films/:id', checkToken, FilmController.updateFilm);
router.delete('/films/:id', checkToken, FilmController.deleteFilm);

export default router;