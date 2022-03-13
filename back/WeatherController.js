import WeatherService from './WeatherService.js'

class WeatherController {
    async create(data) {
        var array = []
        for (let i = 0; i < data.length; i++) {
            array.push({
                hour: data[i].hour,
                temp: data[i].temp,
                feels_like: data[i].feels_like,
                condition: data[i].condition,
            })
        }
        const weather = await WeatherService.create(array)
        return weather

    }
    async getLastWeather(req, res) {
        const weather = await WeatherService.getLastWeather()
        return res.json(weather)
    }

}

export default new WeatherController()