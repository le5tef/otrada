import fs from 'fs';
import Weather from './Weather.js'

class WeatherService {
    async create(data) {
        const weather = await Weather.create({ info: data });
        return weather
    }
    async getLastWeather() {
        const lastWeather = await Weather.find()
        return lastWeather[lastWeather.length - 1]
    }
}
export default new WeatherService();