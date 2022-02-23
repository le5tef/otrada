import express from 'express'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'
import router from './router.js'
import cors from 'cors'

const PORT = 5000;
const DB_URL = 'mongodb+srv://le5tef:analsex@cluster0.izow9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express()

async function authMiddleware(req, res, next) {
    console.log("auth")
    if ((req.method == 'PUT' || req.method == 'DELETE' || req.method == 'POST') && req.headers.authorization != "qQfg52t5aw2dW") {
        console.log('идинваухй1')
        return res.status(403).send({ 'status': 'Ага, щас' })
    }
    next()

}

app.use(cors());
app.options('*', cors());
app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload())
app.use(authMiddleware)
app.use('/api', router)





async function startApp() {
    await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    app.listen(PORT, () => console.log('start'))
}

startApp()
