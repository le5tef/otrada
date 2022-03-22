import express from 'express'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'
import router from './router.js'
import cors from 'cors'
import 'dotenv/config'
import axios from 'axios'
import WeatherController from './WeatherController.js'
import ExchangeController from './ExchangeController.js'
import schedule from 'node-schedule'
const PORT = 5000;
const DB_URL = process.env.DB_URL
const startTime = new Date(Date.now() + 1000);


const app = express()

async function authMiddleware(req, res, next) {

    const auth = ((req.method == 'PUT' || req.method == 'DELETE' || req.method == 'POST') && req.headers.authorization != "qQfg52t5aw2dW")
    const comments = (req.path == '/api/comments' && (req.method == 'POST' || req.method == 'GET'))
    // console.log(req.path, req.method, req.path == '/api/comments', req.method == 'DELETE')
    if (comments) {
    }
    else if (!auth) {
    }
    else {
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

function fetchWeather() {
    axios
        .get('https://api.weather.yandex.ru/v1/forecast?lat=55.876921605909864&lon=37.31409801384656', {
            headers: {
                'X-Yandex-API-Key': 'e56e493c-844c-4e76-9485-1baa66aefac6'
            }
        })
        .then(res => {
            WeatherController.create(res.data.forecasts[0].hours)
            // console.log(res.data.forecasts[0].hours)
        })
        .catch(error => {
            console.error(error)
        })
}

function fetchExchange() {
    axios
        .get('https://www.cbr-xml-daily.ru/daily_json.js')
        .then(res => {
            ExchangeController.create([{ 'charCode': 'Юань', 'value': res.data.Valute.CNY.Value }, { 'charCode': 'Доллар', 'value': res.data.Valute.USD.Value }, { 'charCode': 'Евро', 'value': res.data.Valute.EUR.Value },])
        })
        .catch(error => {
            console.error(error)
        })
}

async function startApp() {
    await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    app.listen(PORT, () => console.log('start'))
}
fetchWeather()
fetchExchange()
startApp()

const job = schedule.scheduleJob({ start: startTime, rule: '0 0 0 * * *' }, function () {
    fetchExchange()
    fetchWeather()
    console.log('раз в сутки и палка стреляет')
});
