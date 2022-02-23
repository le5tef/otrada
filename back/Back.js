import mongoose from 'mongoose';

const Back = new mongoose.Schema({
    title: { type: String, },
    src: { type: String, },
})

export default mongoose.model('Back', Back)