import { markdown } from 'markdown';

const convertToHtml = (post) => {
  post.body = markdown.toHTML(post.body);
  return post;
}

export default async (req, res, next) => {
  const { posts, post } = res;
  if (req.query.md !== undefined ) {
    return res.json(post);
  }
  if (post) res.json(convertToHtml(post));
  if (posts) res.json({ posts: posts.map(convertToHtml) });
  next();
}
