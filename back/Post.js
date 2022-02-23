import mongoose from 'mongoose';


const Post = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    type: { type: String },
    subcategory: { type: String },
    isMain: { type: Boolean },
    media: [{ type: String }],
    video: [{ type: String }],
    link: { type: String },
    contacts: { type: String },
})

export default mongoose.model('Post', Post)