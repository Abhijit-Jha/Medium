import React from 'react'
import AppBar, { Avatar } from './AppBar'
import { BlogInterface } from '../hooks'
import { useParams } from 'react-router-dom'
import { useSpecificBlog } from '../hooks'

const FullBlog = ({blog}:{blog:BlogInterface}) => {
    const {id} = useParams()

    return (
        <div>
            <AppBar />
            <div className='flex justify-center space-x-8 mt-10 '>
                <div className='w-2/3 ml-10 space-y-2'>
                    <div className='font-bold text-4xl'>
                        {blog.title} 
                    </div>
                    <div className='text-slate-600'>
                        Posted on {blog.createdAt.slice(0,10)} 
                    </div>
                    <div>
                        {blog.content}
                    </div>
                </div>
                <div className='w-1/3'>
                    <div>Author</div>
                    <AuthorCard author={blog.author.name || "Unknown"} />
                </div>
            </div>
        </div>
    )
}

function AuthorCard({ author } : {author :string}) {
    return (
        <div className=''>
            <div className='flex space-x-5'>
                <Avatar name={author} />
                <div>{author}</div>
            </div>
        </div>
    )
}

export default FullBlog
