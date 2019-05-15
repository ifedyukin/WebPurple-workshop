import fetch from 'node-fetch';
import Genre from '../models/genre';
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
    let genres;

    try {
        genres = await Genre.find();
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }
  
    res.films = films;
    next();
}

export async function deleteGenre(req, res, next) {
    const _id = req.params.id;
  
    let genre;
    try {
        genre = await Genre.findOne({ _id });
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }
  
    if (!genre) {
        return next({
            status: 404,
            message: 'Genre not found!'
        });
    }
  
    try {
      await genre.remove();
     } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }
  
    return res.json({ message: 'success delete' });
}

export async function updateGenre(req, res, next) {
    const _id = req.params.id;
    const postData = req.body;
  
    let genre;
    try {
        genre = await Genre.findOne({ _id });
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }
  
    if (!genre) {
        return next({
            status: 404,
            message: 'Genre not found!'
        });
    }
  
    // спросить!!!
    try {
        await Genre.findOneAndUpdate({ _id }, {
            ...post.toObject(),
            ...postData,
        });
        genre = await Genre.findOne({ _id });
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }
  
    return res.json(genre);
}