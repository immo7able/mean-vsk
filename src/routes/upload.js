const express = require('express')
const upload = require('../middleware/multerConfig')

const router = express.Router()

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' })
  }
  res.json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
  })
})

module.exports = router
