import mongoose from 'mongoose';


const Banner = new mongoose.Schema({
    title: { type: String },
    media: { type: String },
})

export default mongoose.model('Banner', Banner)