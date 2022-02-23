
import CryptoService from './CryptoService.js'

class CryptoController {
    async login(req, res) {
        try {
            const { pass } = req.body;
            const auth = await CryptoService.login(pass)
            return res.json(auth)
        }
        catch (e) {
            console.error(e)
            res.status(500).json(e)
        }
    }

}

export default new CryptoController()