/**
 * Валидация данных задачи
 * @param {Object} req - Объект запроса
 * @param {Object} res - Объект ответа
 * @param {Function} next - Следующий middleware
 */
module.exports = (req, res, next) => {
  const { info } = req.body

  if (!info || info.trim().length === 0) {
    return res.status(400).json({
      error: 'Название задачи обязательно для заполнения',
    })
  }

  if (info.length > 100) {
    return res.status(400).json({
      error: 'Название задачи не должно превышать 100 символов',
    })
  }

  next()
}
