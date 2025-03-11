'use client'
import { useState } from 'react'

export default function UploadPage() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [message, setMessage] = useState('')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('http://localhost:3033/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      setMessage(data.message)
      setFile(null)
      setPreview('')
    } catch (error) {
      setMessage('Error uploading file')
    }
  }

  return (
    <div>
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <input type='file' onChange={handleFileChange} accept='image/*' />
        <button type='submit'>Upload</button>
      </form>

      {preview && (
        <div>
          <h3>Preview:</h3>
          <img src={preview} alt='Preview' style={{ maxWidth: '500px' }} />
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  )
}
