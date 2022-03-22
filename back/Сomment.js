import mongoose from 'mongoose';

const Comment = new mongoose.Schema({
    description: { type: String, },
    post_id: { type: String, },
    author: { type: String },
    rate: { type: Number },

})

export default mongoose.model('Comment', Comment)