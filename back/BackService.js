import fs from 'fs';
import Background from './Back.js'
import fileService from './fileService.js'
import mongoose from 'mongoose';

class BackService {
    async create(title) {

        const back = await Background.create({ title, src: '' });
        return back
    }
    async addMedia(id, media) {
        const file = fileService.saveFile(media);
        console.log(id, file.fileName)
        const back = await Background.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, { $set: { src: file.fileName } })

        return back
    }
    async delete(id) {
        const back = await Background.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) })
        return back
    }
    async deleteMedia(id) {
        console.log(id)
        const back = await Background.findById(mongoose.Types.ObjectId(id));
        if (back.src) {
            fileService.deleteFile(back.src);
        }
        return back
    }
    async getAll() {

        const backs = await Background.find()
        return backs

    }
}

export default new BackService();