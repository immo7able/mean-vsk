const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const logger = require('./middleware/logger')
const postsRouter = require('./routes/posts')
const uploadRoutes = require('./routes/upload')

// Глобальные middleware
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests only from your Next.js app
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
)
app.use(express.json()) // Парсинг JSON-тела запроса
app.use(logger) // Логирование запросов
app.use(express.json()) // Затем парсим JSON
app.use(express.urlencoded({ extended: true })) // Обрабатываем обычные формы


app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Подключение маршрутов
app.use('/upload', uploadRoutes)
app.use('/posts', postsRouter)

// Обработка ошибок 404 (не найден)
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' })
})

// Централизованная обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Внутренняя ошибка сервера' })
})

module.exports = app
