import fetch from 'node-fetch';
import Film from '../models/film';
// import User from '../models/user';
import config from '../config/';

// спросить!!!
export async function create(req, res, next) {
    // Получаем информацию о записи из тела запроса
    const postData = req.body;
    // Получаем id пользователя из запроса
    const userId = req.user._id;
    // Записываем пользователя в авторы поста
    postData.userId = userId;
  
    let post;
    try {
      // Создаём запись в БД
      post = await Post.create(postData);
    } catch ({ message }) {
      return next({
        status: 400,
        message
      });
    }
  
    // Записываем созданный пост в объект ответа
    res.post = post;
    // Переходим к следующему обработчику
    next();
}

export async function getAll(req, res, next) {
    let films = [];

    try {
        films = await Film.find({});
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }

    res.send(films);
    // next();
}

export async function deleteFilm(req, res, next) {
    const _id = req.params.id;
  
    let film;
    try {
        film = await Film.findOne({ _id });
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }
  
    if (!film) {
        return next({
            status: 404,
            message: 'Film not found!'
        });
    }
  
    try {
        await film.remove();
     } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }
  
    return res.json({ message: 'success delete' });
}

export async function updateFilm(req, res, next) {
    const _id = req.params.id;
    const postData = req.body;
  
    let film;
    try {
        film = await Film.findOne({ _id });
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }
  
    if (!film) {
        return next({
            status: 404,
            message: 'Film not found!'
        });
    }
  
    // спросить!!!
    try {
        await Film.findOneAndUpdate({ _id }, {
            ...post.toObject(),
            ...postData,
            });
        film = await Film.findOne({ _id });
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }
  
    return res.json(film);
}