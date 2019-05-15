import fetch from 'node-fetch';
import Director from '../models/director';
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
    let directors;

    try {
        directors = await Director.find();
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }
  
    res.directors = directors;
    next();
}

export async function deleteDirector(req, res, next) {
    const _id = req.params.id;
  
    let director;
    try {
        director = await Director.findOne({ _id });
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }
  
    if (!director) {
        return next({
            status: 404,
            message: 'Director not found!'
        });
    }
  
    try {
        await director.remove();
     } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }
  
    return res.json({ message: 'success delete' });
}

export async function updateDirector(req, res, next) {
    const _id = req.params.id;
    const postData = req.body;
  
    let director;
    try {
        director = await Director.findOne({ _id });
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }
  
    if (!director) {
        return next({
            status: 404,
            message: 'Director not found!'
        });
    }
  
    // спросить!!!
    try {
        await Director.findOneAndUpdate({ _id }, {
            ...post.toObject(),
            ...postData,
        });
        director = await Director.findOne({ _id });
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }
  
    return res.json(director);
  }