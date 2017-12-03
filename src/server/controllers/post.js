import fetch from 'node-fetch';
import Post from '../models/post';
import User from '../models/user';
import config from '../config/';
import { getVkPostBody } from '../helpers';

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
  let posts;
  try {
    // posts = все посты из БД
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }

  res.posts = posts;
  next();
}

export async function getPostByUrl(req, res, next) {
  const { url } = req.params;

  let post;
  try {
    // post = одна запись, удовлетворяющая поиску по `url`
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }

  res.post = post;
  next();
}

export async function deletePost(req, res, next) {
  const _id = req.params.id;

  let post;
  try {
    post = await Post.findOne({ _id });
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }

  if (!post) {
    return next({
      status: 404,
      message: 'Post not found!'
    });
  }

  try {
    // удалить запись post
   } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }

  return res.json({ message: 'success delete' });
}

export async function updatePost(req, res, next) {
  const _id = req.params.id;
  const postData = req.body;

  let post;
  try {
    post = await Post.findOne({ _id });
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }

  if (!post) {
    return next({
      status: 404,
      message: 'Post not found!'
    });
  }

  try {
    await Post.findOneAndUpdate({ _id }, {
      ...post.toObject(),
      ...postData,
    });
    post = await Post.findOne({ _id });
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }

  return res.json(post);
}

export async function getVk(req, res, next) {
  const { vk_token, vk_user } = config;
  // определите const wall

  const posts = wall.response.items
    .filter(/* условие фильтра */)
    .map(post => ({
      _id: post.id,
      url: `https://vk.com/wall${vk_user}_${post.id}`,
      title: post.copy_history ? '[VK-repost]' : '[VK-post]',
      createdAt: post.date * 1000,
      body: getVkPostBody(post),
      type: 'vk',
    }));

  return res.json(posts);
}
