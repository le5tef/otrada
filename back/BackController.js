
import BackService from './BackService.js'

class BackController {
    async create(req, res) {

        const { title } = req.body
        const back = await BackService.create(title)
        return res.json(back)

    }
    async addMedia(req, res) {

        const { id } = req.params;
        const back = await BackService.addMedia(id, req.files.src)
        res.json(back)

    }
    async getAll(req, res) {

        const backs = await BackService.getAll()
        return res.json(backs)

    }
    async delete(req, res) {
        const { id } = req.params;
        const media = await BackService.deleteMedia(id)
        const back = await BackService.delete(id)
        return res.json(back)

    }
}

export default new BackController()