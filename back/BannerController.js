
import BannerService from './BannerService.js'

class BannerController {
    async create(req, res) {
        try {
            const banner = await BannerService.create(req.body)
            res.status(200).json(banner)
        }
        catch (e) {
            res.status(500).json(e)
        }

    }
    async getBannner(req, res) {
        try {
            const banner = await BannerService.getBannner()
            return res.json(banner)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const title = req.body.title
            const media = req.files.media
            console.log(title, media)
            const updatedBanner = await BannerService.update(id, title, media)
            return res.json(updatedBanner)

        }
        catch (e) {
            console.error(e)
            res.status(500).json(e)
        }
    }



}

export default new BannerController()