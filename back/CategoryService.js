import fs from 'fs';
import Post from './Post.js';
import Category from './Category.js'

class CategoryService {
    async create(name, type) {
        const createdCategory = await Category.create({ title: name, type });
        return createdCategory
    }
    async getAll() {

        const categories = await Category.find()
        return categories

    }
    async delete(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        await Post.deleteMany({ subcategory: id })
        await Category.deleteOne({ _id: id })
    }
}

export default new CategoryService();