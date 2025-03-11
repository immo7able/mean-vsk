const Post = require('../models/Post')

module.exports = {
  // Получить список всех задач
  getAllPosts(req, res) {
    res.json(Post.getAll())
  },

  // Получить задачу по ID
  getPostById(req, res) {
    const post = Post.getById(Number(req.params.id))

    if (!post) {
      return res.status(404).json({ error: 'Задача не найдена' })
    }

    res.json(post)
  },

  // Создать новую задачу
  createPost(req, res) {
    const newPost = Post.create({
      info: req.body.info,
      img: req.body.img || '',
      authorId: null,
    })

    res.status(201).json(newPost)
  },

  // Обновить существующую задачу
  updatePost(req, res) {
    const updatedPost = Post.update(Number(req.params.id), req.body)

    if (!updatedPost) {
      return res.status(404).json({ error: 'Задача не найдена' })
    }

    res.json(updatedPost)
  },

  // Удалить задачу
  deletePost(req, res) {
    const isDeleted = Post.delete(Number(req.params.id))

    if (!isDeleted) {
      return res.status(404).json({ error: 'Задача не найдена' })
    }

    res.status(204).send()
  },
}
