import express from 'express'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'
import router from './router.js'
import cors from 'cors'
import 'dotenv/config'

const PORT = 5000;
const DB_URL = process.env.DB_URL

const app = express()

async function authMiddleware(req, res, next) {
    console.log("auth")
    if ((req.method == 'PUT' || req.method == 'DELETE' || req.method == 'POST') && req.headers.authorization != "qQfg52t5aw2dW") {
        console.log('неа')
        return res.status(403).send({ 'status': 'Ага, щас' })
    }
    next()

}

app.use(cors());
app.options('*', cors());
app.use(express.json())
app.use('/static/', express.static('static'));
app.use(fileUpload())
app.use(authMiddleware)
app.use('/api', router)





async function startApp() {
    await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    app.listen(PORT, () => console.log('start'))
}

startApp()
