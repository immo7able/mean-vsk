'use client'
import { useState, useEffect } from 'react'
import PostItem from './PostItem'

const API_URL = 'http://localhost:3033/posts'

export default function PostList() {
    const [posts, setPosts] = useState([])
    const [authorFilter, setAuthorFilter] = useState('')

    useEffect(() => {
        fetchPosts()
    }, [authorFilter])

    const fetchPosts = async () => {
        const url = authorFilter ? `${API_URL}?authorId=${authorFilter}` : API_URL
        const res = await fetch(url)
        const data = await res.json()
        setPosts(data)
    }

    return (
        <div>
            <input
                type='text'
                placeholder='Filter by Author ID'
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
                className='border p-2 rounded mb-4'
            />
            {posts.map((post) => (
                <PostItem key={post.id} post={post} refreshPosts={fetchPosts} />
            ))}
        </div>
    )
}
