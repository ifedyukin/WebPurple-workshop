import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  // схему записи описывать здесь
});

export default mongoose.model('Post', PostSchema);
