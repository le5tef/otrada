import Post from './Post.js'
import fileService from './fileService.js'
import mongoose from 'mongoose';
class PostService {
    async create(post) {
        const createdPost = await Post.create({ ...post, media: [], video: [] });
        return createdPost
    }
    async addMedia(id, media) {
        const file = fileService.saveFile(media);
        const field = file.type.split('/')[0] == 'video' ? 'video' : 'media'
        console.log(media)
        const post = Post.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, {
            $push: {
                [field]: file.fileName
            }
        })
        return post
    }
    async deleteMedia(id) {
        const post = await Post.findById(mongoose.Types.ObjectId(id));
        if (post.media) {
            for (var i = 0; i < post.media.length; i++)
                fileService.deleteFile(post.media[i]);
            for (var i = 0; i < post.video.length; i++)
                fileService.deleteFile(post.video[i]);
        }
        return post
    }
    async getAll() {

        const posts = await Post.find()
        return posts

    }
    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const post = await Post.findById(id)
        return post
    }
    async update(post) {
        if (!post._id) {
            throw new Error('не указан ID')
        }
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, { new: true })
        return res.json(updatedPost)
    }
    async delete(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const post = await Post.findByIdAndDelete(id);
        return post
    }
    async addCategory(id, category) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const post = Post.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, { category }, { new: true })
        return post
    }
    async deleteCategory(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const post = Post.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, { category: null })
        return post
    }

}

export default new PostService();