import mongoose from 'mongoose';

const Weather = new mongoose.Schema({
    info: [{
        hour: String,
        temp: Number,
        feels_like: Number,
        condition: String,
    }],
})

export default mongoose.model('Weather', Weather)