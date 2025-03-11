// Имитация базы данных в памяти
let posts = require('../../data/postsData')

let lastId = posts.length ? Math.max(...posts.map((p) => p.id)) : 0 // Счетчик для генерации ID

module.exports = {
  /**
   * Получить все задачи
   * @returns {Array} Массив задач
   */
  getAll() {
    return posts
  },

  /**
   * Найти задачу по ID
   * @param {number} id - Идентификатор задачи
   * @returns {Object|null} Объект задачи или null
   */
  getById(id) {
    return posts.find((post) => post.id === id) || null
  },

  /**
   * Создать новую задачу
   * @param {Object} data - Данные задачи
   * @returns {Object} Созданная задача
   */
  create(data) {
    const newPost = {
      id: ++lastId,
      info: data.info,
      img: data.img,
      authorId: data.authorId,
      publishDate: new Date(),
      views: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 1000),
      comments: [],
    }
    posts.push(newPost)
    return newPost
  },

  /**
   * Обновить существующую задачу
   * @param {number} id - Идентификатор задачи
   * @param {Object} updates - Новые данные
   * @returns {Object|null} Обновленная задача или null
   */
  update(id, updates) {
    const post = this.getById(id)
    if (!post) return null

    Object.assign(post, updates)
    return post
  },

  /**
   * Удалить задачу
   * @param {number} id - Идентификатор задачи
   * @returns {boolean} Успех операции
   */
  delete(id) {
    const initialLength = posts.length
    posts = posts.filter((post) => post.id !== id)
    return posts.length !== initialLength
  },
}
