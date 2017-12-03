import fetch from 'node-fetch';
import Post from '../models/post';
import User from '../models/user';
import config from '../config/';
import { getVkPostBody } from '../helpers';

export async function create(req, res, next) {
  const postData = req.body;
  const userId = req.user._id;

  postData.userId = userId;

  let post;
  try {
    post = await Post.create(postData);
  } catch ({ message }) {
    return next({
      status: 400,
      message
    });
  }

  res.post = post;
  next();
}

export async function getAll(req, res, next) {
  let posts;
  try {
    posts = await Post.find({});
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
    post = await Post.findOne({ url });
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
    await post.remove();
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
  const wall = await fetch('https://api.vk.com/method/wall.get?filter=owner&owner_id=' + vk_user + '&access_token=' + vk_token + '&v=5.69')
    .then(response => response.json());

  const posts = wall.response.items
    .filter(post => post.post_type === 'post')
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
