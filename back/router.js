import Router from 'express'
import PostController from './PostController.js'
import CategoryController from './CategoryController.js'
import BackController from './BackController.js'


const router = new Router()
router.delete('/posts/:id/delete-media', PostController.deleteMedia)
router.post('/posts/:id/add-media', PostController.addMedia)
router.post('/posts/:id/add-category', PostController.addCategory)
router.post('/posts/:id/delete-category', PostController.deleteCategory)
router.post('/categories', CategoryController.create)
router.get('/categories', CategoryController.getAll)
router.delete('/categories/:id', CategoryController.delete)
router.post('/posts', PostController.create)
router.get('/posts', PostController.getAll)
router.get('/posts/:id', PostController.getOne)
router.put('/posts', PostController.update)
router.delete('/posts/:id', PostController.delete)
router.get('/backs', BackController.getAll)
router.post('/backs', BackController.create)
router.post('/backs/:id/add-media', BackController.addMedia)
router.delete('/backs/:id', BackController.delete)
router.post('/check-pass', (req, res) => { res.json('ok') })


export default router;