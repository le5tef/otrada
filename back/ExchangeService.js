import Exchange from './Exchange.js'

class ExchangeService {
    async create(data) {
        const exchange = await Exchange.create({ 'info': data });
        return exchange
    }
    async getLastExchange() {
        const lastExchange = await Exchange.find()
        return lastExchange[lastExchange.length - 1]
    }
}
export default new ExchangeService();