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

export const getVkPostBody = (post) => {
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
