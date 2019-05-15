import mongoose, { Schema } from 'mongoose';

const GenreSchema = new Schema({
    genreName: {type: String, required: true},
    description: {type: String, required: true}
});

export default mongoose.model('Genre', GenreSchema);
