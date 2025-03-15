'use client'
import { useEffect, useState } from 'react'
import AddPost from './components/AddPost'
import PostItem from './components/PostItem'

const API_URL = 'http://localhost:3033/posts'

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
