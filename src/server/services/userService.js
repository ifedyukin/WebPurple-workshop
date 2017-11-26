import User from '../models/user';

export async function getUserByToken(token) {
  const { _id } = token;
  
  let user;
  try {
    user = await User.findOne({ _id }, { password: 0 });
  } catch (err) {
    throw err;
  }
  
  return user;
}
