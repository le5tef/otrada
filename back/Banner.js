import mongoose from 'mongoose';


const Banner = new mongoose.Schema({
    title: { type: String },
    media: { type: String },
    isVideo: { type: Boolean }
})

export default mongoose.model('Banner', Banner)