
import Comment from './Сomment.js'
import mongoose from 'mongoose';
class CommentService {
    async create(description, post_id, author, rate) {
        const createdComment = await Comment.create({ description, post_id, author, rate });
        return createdComment
    }
    async getAllByPost(post_id) {
        const comments = await Comment.find({ post_id: post_id })
        return comments
    }
    async deleteById(id) {
        const comment = await Comment.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) })
        return comment

    }
    async deleteByPostId(id) {
        await Comment.deleteMany({ post_id: id })

    }
}

export default new CommentService();