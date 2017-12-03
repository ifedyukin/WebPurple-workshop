export const convertDate = (str) => {
  const date = new Date(str);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

export const sortByDate = arr => arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
