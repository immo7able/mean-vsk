const Post = require('../models/Post')

module.exports = {
  // Получить список всех постов (с фильтром по authorId)
  getAllPosts(req, res) {
    const { authorId } = req.query
    let posts = Post.getAll()

    if (authorId) {
      posts = posts.filter(post => post.authorId === authorId)
    }

    res.json(posts)
  },

  // Получить пост по ID
  getPostById(req, res) {
    const post = Post.getById(Number(req.params.id))

    if (!post) {
      return res.status(404).json({ error: 'Пост не найден' })
    }

    res.json(post)
  },

  createPost(req, res) {
    const { info, authorId } = req.body

    const newPost = Post.create({
      info: info,
      img: req.file ? `/uploads/${req.file.filename}` : '', // Сохраняем путь к файлу
      authorId: authorId || null
    })

    res.status(201).json(newPost)
  },

  // Обновить пост (с возможной заменой изображения)
  updatePost(req, res) {
    const { info } = req.body
    const postId = Number(req.params.id)

    const existingPost = Post.getById(postId)
    if (!existingPost) {
      return res.status(404).json({ error: 'Пост не найден' })
    }

    const updatedData = { info }

    // Если загружено новое изображение, удаляем старое
    if (req.file) {
      if (existingPost.img) {
        const oldImagePath = path.join(__dirname, '../', existingPost.img)
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath) // Удаление старого изображения
        }
      }
      updatedData.img = `/uploads/${req.file.filename}`
    }

    const updatedPost = Post.update(postId, updatedData)
    res.json(updatedPost)
  },

  // Удалить пост
  deletePost(req, res) {
    const isDeleted = Post.delete(Number(req.params.id))

    if (!isDeleted) {
      return res.status(404).json({ error: 'Пост не найден' })
    }

    res.status(204).send()
  },

  // Лайкнуть пост
  likePost(req, res) {
    const postId = Number(req.params.id)
    const post = Post.getById(postId)

    if (!post) {
      return res.status(404).json({ error: 'Пост не найден' })
    }

    const updatedPost = Post.update(postId, { likes: post.likes + 1 })
    res.json(updatedPost)
  },
}
