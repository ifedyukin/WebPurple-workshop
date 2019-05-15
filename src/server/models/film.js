import mongoose, { Schema } from 'mongoose';

const FilmSchema = new Schema({
    movieName: {type: String, required: true},
    country: {type: String, required: true},
    genres: {type: Array, required: true},
    rating: {type: Number, required: true},
    duration: {type: Number, required: true}
});

export default mongoose.model('Film', FilmSchema);
