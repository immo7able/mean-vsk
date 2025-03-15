const express = require('express')
const router = express.Router()
const controller = require('../controllers/posts')
const validator = require('../middleware/validator')

// Маршруты для работы с задачами
router.get('/', controller.getAllPosts) // GET /posts
router.get('/:id', controller.getPostById) // GET /posts/:id
router.post('/', validator, controller.createPost) // POST /posts
router.put('/:id', validator, controller.updatePost) // PUT /posts/:id
router.delete('/:id', controller.deletePost) // DELETE /posts/:id
router.post('/:id/like', controller.likePost) // POST /posts/:id/like

module.exports = router
