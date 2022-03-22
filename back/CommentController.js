
import CommentService from './CommentService.js'

class CommentController {
    async create(req, res) {
        const { description, post_id, author, rate } = req.body;
        const comment = await CommentService.create(description, post_id, author, rate)
        return res.json(comment)
    }
    async getAllByPost(req, res) {
        const post_id = req.params.post;

        const comments = await CommentService.getAllByPost(post_id)
        return res.json(comments)
    }
    async delete(req, res) {
        const id = req.params.id;
        const comment = await CommentService.deleteById(id)
        return res.json(comment)
    }
}

export default new CommentController()