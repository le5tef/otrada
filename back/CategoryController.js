
import CategoryService from './CategoryService.js'

class CategoryController {
    async create(req, res) {

        const { title, type } = req.body;
        const category = await CategoryService.create(title, type)
        return res.json(category)


    }
    async getAll(req, res) {

        const categories = await CategoryService.getAll()
        return res.json(categories)

    }
    async delete(req, res) {

        const { id } = req.params;
        const category = await CategoryService.delete(id)
        return res.json(category)


    }
}

export default new CategoryController()