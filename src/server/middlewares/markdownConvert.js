import { markdown } from 'markdown';

const convertToHtml = (page) => {
  page.body = markdown.toHTML(page.body);
  return page;
}

export default async (req, res, next) => {
  const { pages, page } = res;
  if (req.query.md !== undefined ) {
    return res.json(page);
  }
  if (page) res.json(convertToHtml(page));
  if (pages) res.json({ pages: pages.map(convertToHtml) });
  next();
}
