import fetch from 'node-fetch';
import Page from '../models/page';
import User from '../models/user';

const ALLOWED_TYPES = ['photo'];

const getVkAttachCode = (attach) => {
  const { type } = attach;
  switch (type) {
    case 'photo':
      const sizes = Object.keys(attach.photo).filter(key => key.indexOf('photo_') === 0);
      const link = sizes[sizes.length - 1];
      return `<img alt="photo" src="${attach.photo[link]}" />`
      break;
  
    default:
      break;
  }
}

const getVkPostBody = (post) => {
  const { text, copy_history, attachments } = post;
  if (copy_history) {
    return `<p>${text}</p><br /><a href="https://vk.com/wall${copy_history[0].owner_id}_${copy_history[0].id}">Repost history...</a>`;
  }
  const displayAttach = attachments.filter(a => ALLOWED_TYPES.includes(a.type));
  const attachCode = displayAttach.reduce((code, att) => code + getVkAttachCode(att), '');
  return `
    <p>${text}</p>
    ${displayAttach.length < attachments.length ? `<a href="https://vk.com/wall${post.owner_id}_${post.id}">All attachments...</a>` : ''}
    ${attachCode}   
  `;
}

export async function create(req, res, next) {
  const pageData = req.body;
  const userId = req.user._id;

  pageData.userId = userId;

  let page;
  try {
    page = await Page.create(pageData);
  } catch ({ message }) {
    return next({
      status: 400,
      message
    });
  }

  res.page = page;
  next();
}

export async function getAll(req, res, next) {
  let pages;
  try {
    pages = await Page.find({});
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }

  res.pages = pages;
  next();
}

export async function getPageByUrl(req, res, next) {
  const { url } = req.params;

  let page;
  try {
    page = await Page.findOne({ url });
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }

  res.page = page;
  next();
}

export async function deletePage(req, res, next) {
  const _id = req.params.id;

  let page;
  try {
    page = await Page.findOne({ _id });
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }

  if (!page) {
    return next({
      status: 404,
      message: 'Page not found!'
    });
  }

  try {
    await page.remove();
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }

  return res.json({ message: 'success delete' });
}

export async function updatePage(req, res, next) {
  const _id = req.params.id;
  const pageData = req.body;

  let page;
  try {
    page = await Page.findOne({ _id });
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }

  if (!page) {
    return next({
      status: 404,
      message: 'Page not found!'
    });
  }

  try {
    await Page.findOneAndUpdate({ _id }, {
      ...page.toObject(),
      ...pageData,
    });
    page = await Page.findOne({ _id });
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }

  return res.json(page);
}

export async function getVk(req, res, next) {
  const VK_TOKEN = '6a2750226a2750226a275022a06a78eae766a276a275022303d339d487914ce08c44f1d';
  const VK_USER = '54850767';

  const wall = await fetch('https://api.vk.com/method/wall.get?filter=owner&owner_id=' + VK_USER + '&access_token=' + VK_TOKEN + '&v=5.69')
    .then(response => response.json());

  const posts = wall.response.items
    .filter(post => post.post_type === 'post')
    .map(post => ({
      _id: post.id,
      url: `https://vk.com/wall${VK_USER}_${post.id}`,
      title: post.copy_history ? '[VK-repost]' : '[VK-post]',
      createdAt: post.date * 1000,
      body: getVkPostBody(post),
      type: 'vk',
    }));

  return res.json(posts);
}
