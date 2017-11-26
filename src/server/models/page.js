import mongoose, { Schema } from 'mongoose';

const PageSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Page', PageSchema);
