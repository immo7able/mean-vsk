'use client'
import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:3033/posts'

export default function Home() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [image, setImage] = useState(null)

  const fetchItems = async () => {
    const res = await fetch(API_URL)
    const data = await res.json()
    setItems(data)
  }

  function formatBeautifulDate(dateString, locale = 'ru-RU') {
    const date = new Date(dateString)
    return date.toLocaleString(locale, {
      weekday: 'long', // Full weekday name
      day: '2-digit', // Two-digit day
      month: 'long', // Full month name
      year: 'numeric', // Full year
      hour: '2-digit', // Two-digit hour
      minute: '2-digit', // Two-digit minute
      // second: '2-digit', // Two-digit second
      // timeZoneName: 'short', // Short time zone name
    })
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const addItem = async () => {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ info: newItem }),
    })
    setNewItem('')
    fetchItems()
  }

  const updateItem = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ info: 'Updated Item' }),
    })
    fetchItems()
  }

  const deleteItem = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    fetchItems()
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', image)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()
    alert(result.message)
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        <h1>Next.js CRUD App</h1>
        <form onSubmit={handleUpload}>
          <input type='file' onChange={(e) => setImage(e.target.files[0])} />
          <button type='submit'>Upload</button>
        </form>

        <input
          type='text'
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>

        {items.map((item) => (
          <div
            key={item.id}
            className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700'
          >
            {item.img && item.img != '' && (
              <a href='#'>
                <img
                  className='rounded-t-lg'
                  src='/docs/images/blog/image-1.jpg'
                  alt=''
                />
              </a>
            )}
            <div className='p-5'>
              <a href='#'>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate'>
                  {item.info}
                </h5>
              </a>
              <p className='mb-3 font-normal text-xl text-gray-700 dark:text-gray-200'>
                {item.info}
              </p>
              <a
                href='#'
                className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Read more
                <svg
                  className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 10'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M1 5h12m0 0L9 1m4 4L9 9'
                  />
                </svg>
              </a>
              <p className='mb-3 font-normal text-xl text-gray-700 dark:text-gray-200'>
                {item.views}
              </p>
              <p className='mb-3 font-normal text-xl text-gray-700 dark:text-gray-200'>
                {item.likes}
              </p>
              <p className='mb-3 font-normal text-xl text-gray-700 dark:text-gray-200'>
                {item.comments.length}
              </p>
            </div>
          </div>
        ))}

        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.info}
              <button onClick={() => updateItem(item.id)}>Update</button>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
