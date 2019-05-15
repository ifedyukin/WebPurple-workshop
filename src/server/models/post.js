import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model('Post', PostSchema);
