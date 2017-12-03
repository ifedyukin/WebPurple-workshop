import mongoose, { Schema, mongo } from 'mongoose';
import bcrypt from 'bcrypt-as-promised';

// Описываем схему пользователя
const UserSchema = new Schema({
  login: { type: String, unique: true, lowercase: true, index: true, required: true },
  password: { type: String, required: true }
});

// Перед сохранением мы хешируем пароль пользователя (это вопрос безопасности)
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

// Описание метода модели, позволяющего проверить, совпадают ли пароли
UserSchema.methods.comparePasswords = function (password) {
  return bcrypt.compare(password, this.password);
}

export default mongoose.model('User', UserSchema);
