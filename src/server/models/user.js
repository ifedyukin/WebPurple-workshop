import mongoose, { Schema, mongo } from 'mongoose';

const UserSchema = new Schema({
  login: { type: String, unique: true, lowercase: true, index: true, required: true },
  password: { type: String, required: true }
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  next();
});

UserSchema.methods.comparePasswords = function (password) {
  return password === this.password;
}

export default mongoose.model('User', UserSchema);
