import mongoose, { Schema } from 'mongoose';

const DirectorSchema = new Schema({
    fio: {type: String, required: true},
    age: {type: Number, required: true},
    citizenship: {type: String, required: true},
    films: {type: Array, required: true}
});

export default mongoose.model('Director', DirectorSchema);
