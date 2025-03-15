'use client'
import { useState } from 'react'

const API_URL = 'http://localhost:3033/posts'

const AddPost = ({ onPostAdded }) => { // ✅ Принимаем `onPostAdded`
    const [newPost, setNewPost] = useState('')
    const [image, setImage] = useState(null)
    const [authorId, setAuthorId] = useState('')

    const addPost = async () => {
        if (!newPost.trim()) return

        const formData = new FormData()
        formData.append('info', newPost)
        if (image) formData.append('image', image)
        formData.append('authorId', authorId)

        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ info: newPost,
            image: image,
            authorId: authorId}),
        })

        setNewPost('')
        setImage(null)
        setAuthorId('')

        onPostAdded()
    }

    return (
        <div className='w-full max-w-md mb-5'>
            <input
                className='w-full p-2 border rounded'
                type='text'
                placeholder='New Post...'
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
            />
            <input
                className='w-full p-2 border rounded mt-2'
                type='file'
                onChange={(e) => setImage(e.target.files[0])}
            />
            <input
                className='w-full p-2 border rounded mt-2'
                type='text'
                placeholder='Author ID...'
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
            />
            <button
                className='w-full mt-2 p-2 bg-blue-500 text-white rounded'
                onClick={addPost}
            >
                Add Post
            </button>
        </div>
    )
}

export default AddPost
