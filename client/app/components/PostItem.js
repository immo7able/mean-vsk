'use client'
import { useState } from 'react'

const API_URL = 'http://localhost:3033/posts'

export default function PostItem({ post, onPostUpdated, onPostDeleted }) {
    const [isEditing, setIsEditing] = useState(false)
    const [updatedText, setUpdatedText] = useState(post.info)

    const updatePost = async () => {
        const response = await fetch(`${API_URL}/${post.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ info: updatedText }),
        })

        if (response.ok) {
            setIsEditing(false)
            onPostUpdated()
        }
    }

    const likePost = async () => {
        await fetch(`${API_URL}/${post.id}/like`, { method: 'POST' })
        onPostUpdated()
    }

    return (
        <div className="bg-white shadow-md p-4 rounded mb-4">
            {post.img && <img className="w-full h-40 object-cover rounded mb-2" src={`/uploads/${post.img}`} alt="Post" />}

            {isEditing ? (
                <input
                    className="w-full p-2 border rounded"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                />
            ) : (
                <h2 className="text-xl font-semibold">{post.info}</h2>
            )}

            <p className="text-gray-600">
                Views: {post.views} | Likes: {post.likes} | Comments: {post.comments.length}
            </p>

            <div className="mt-2 flex gap-2">
                {isEditing ? (
                    <button className="bg-green-500 text-white p-1 rounded" onClick={updatePost}>
                        Save
                    </button>
                ) : (
                    <button className="bg-yellow-500 text-white p-1 rounded" onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                )}

                <button className="bg-red-500 text-white p-1 rounded" onClick={() => onPostDeleted(post.id)}>
                    Delete
                </button>

                <button className="bg-blue-500 text-white p-1 rounded" onClick={likePost}>
                    Like ({post.likes})
                </button>
            </div>
        </div>
    )
}
