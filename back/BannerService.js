import Banner from './Banner.js'
import fileService from './fileService.js'
import mongoose from 'mongoose';
class BannerService {
    async create(banner) {
        const createdBanner = await Banner.create({ ...banner, media: '', isVideo: null });
        return createdBanner
    }
    async getBannner() {
        const banner = await Banner.findOne()
        return banner
    }
    async update(id, title, media) {
        const file = fileService.saveFile(media);
        const isVideo = file.type.split('/')[0] == 'video' ? true : false
        console.log(file.fileName, title)
        const updatedBanner = Banner.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, {
            $set: {
                'title': title,
                'media': file.fileName,
                'isVideo': isVideo
            },
        })
        return updatedBanner
    }



}

export default new BannerService();