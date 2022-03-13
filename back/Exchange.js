import mongoose from 'mongoose';

const Exchange = new mongoose.Schema({
    info: [
        {
            charCode: String,
            value: Number,
        }],
})

export default mongoose.model('Exchange', Exchange)