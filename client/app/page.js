'use client'
import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:3033/posts'

const AddPost = ({ onPostAdded }) => {
  const [newPost, setNewPost] = useState('')

  const addPost = async () => {
    if (!newPost.trim()) return
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ info: newPost })
    })
    setNewPost('')
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
        <button
            className='w-full mt-2 p-2 bg-blue-500 text-white rounded'
            onClick={addPost}
        >
          Add Post
        </button>
      </div>
  )
}

const PostItem = ({ post, onPostUpdated, onPostDeleted }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [updatedText, setUpdatedText] = useState(post.info)

  const updatePost = async () => {
    await fetch(`${API_URL}/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ info: updatedText })
    })
    setIsEditing(false)
    onPostUpdated()
  }

  return (
      <div className='bg-white shadow-md p-4 rounded mb-4'>
        {isEditing ? (
            <input
                className='w-full p-2 border rounded'
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
            />
        ) : (
            <h2 className='text-xl font-semibold'>{post.info}</h2>
        )}
        <p className='text-gray-600'>Views: {post.views} | Likes: {post.likes} | Comments: {post.comments.length}</p>
        <div className='mt-2 flex gap-2'>
          {isEditing ? (
              <button className='bg-green-500 text-white p-1 rounded' onClick={updatePost}>
                Save
              </button>
          ) : (
              <button className='bg-yellow-500 text-white p-1 rounded' onClick={() => setIsEditing(true)}>
                Edit
              </button>
          )}
          <button className='bg-red-500 text-white p-1 rounded' onClick={() => onPostDeleted(post.id)}>
            Delete
          </button>
        </div>
      </div>
  )
}

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  const deletePost = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    fetchPosts()
  }

  return (
      <main className='flex flex-col items-center p-10'>
        <h1 className='text-3xl font-bold mb-5'>Blog Posts</h1>
        <AddPost onPostAdded={fetchPosts} />
        <div className='w-full max-w-md'>
          {posts.map((post) => (
              <PostItem key={post.id} post={post} onPostUpdated={fetchPosts} onPostDeleted={deletePost} />
          ))}
        </div>
      </main>
  )
}