import * as uuid from 'uuid';
import * as path from 'path';
import fs from 'fs';

class FileService {
    saveFile(file) {
        var ext = file.name.substr(file.name.lastIndexOf(".") + 1)
        const fileName = uuid.v4() + '.' + ext;
        const filePath = path.resolve('static', fileName);
        file.mv(filePath);
        return { fileName, type: file.mimetype }
    }
    deleteFile(fileName) {
        const filePath = path.resolve('static', fileName);
        fs.unlinkSync(filePath)
    }
}

export default new FileService();