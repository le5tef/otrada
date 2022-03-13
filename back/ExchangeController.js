import ExchangeService from './ExchangeService.js'

class ExchangeController {
    async create(data) {
        const exchange = await ExchangeService.create(data)
        return exchange

    }
    async getLastExchange(req, res) {
        const exchange = await ExchangeService.getLastExchange()
        return res.json(exchange)
    }

}

export default new ExchangeController()