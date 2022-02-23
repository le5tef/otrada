
import PostService from './PostService.js'

class PostController {
    async create(req, res) {
        try {
            const post = await PostService.create(req.body)
            res.status(200).json(post)
        }
        catch (e) {
            res.status(500).json(e)
        }

    }
    async getAll(req, res) {
        try {
            const posts = await PostService.getAll()
            return res.json(posts)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const post = await PostService.getOne(req.params.id)
            return res.json(post)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const post = req.body

            const updatedPost = await PostService.update(post)
            return res.json(updatedPost)

        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params
            const post = await PostService.delete(id);
            return res.json(post)
        }
        catch (e) {
            console.error(e)
            res.status(500).json(e)
        }
    }
    async addMedia(req, res) {
        try {
            const { id } = req.params;
            const post = await PostService.addMedia(id, req.files.media)
            res.json(post)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async deleteMedia(req, res) {
        try {
            const { id } = req.params;
            const post = await PostService.deleteMedia(id)
            res.json(post)
        }
        catch (e) {
            console.error(e)
            res.status(500).json(e)
        }
    }

    async addCategory(req, res) {
        try {
            const { id } = req.params;
            const post = await PostService.addCategory(id, req.body.category)
            res.json(post)
        }
        catch (e) {
            console.error(e)
            res.status(500).json(e)
        }
    }
    async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            const post = await PostService.deleteCategory(id)
            res.json(post)
        }
        catch (e) {
            console.error(e)
            res.status(500).json(e)
        }
    }
}

export default new PostController()