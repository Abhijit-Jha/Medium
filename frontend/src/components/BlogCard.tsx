// import axios from 'axios';
// import { useEffect } from 'react';
// import user from "../store/images/user.png"

import { useNavigate } from "react-router-dom";

interface BlogCardTypes {
    id:string,
    authorName: string,
    publishedAt: string,
    title: string,
    content: string
}

const BlogCard = ({id, authorName, publishedAt, title, content }: BlogCardTypes) => {
    const navigate = useNavigate()
    function handleClick(){
        navigate(`./${id}`)
    }
    
    return (
        <div className="flex justify-center p-2 cursor-pointer" onClick={handleClick}>
        <div className="space-y-2 rounded-xl shadow-lg p-4 bg-white w-[700px]">
            <div className="flex space-x-2">
                <Avatar name={authorName}></Avatar>
                <span className="pt-1 font-light">{authorName}</span>
                <span className="text-xs pt-2 text-slate-400 font-thin">&#x2022; {publishedAt}</span>
            </div>
            <div className="space-y-2">
                <div className="text-2xl font-extrabold pl-2">
                    {title}
                </div>
                <div className="text-xl font-extrabold pl-2 text-slate-700">
                    {content.length > 150 ? content.slice(0, 150) + '...' : content}
                </div>
            </div>
            <div className='text-right mr-10'>{Math.floor(content.length / 100)} minutes to read</div>
        </div>
        </div>
    );
};

interface AvatarProps {
    name: string;
}

export const Avatar = ({ name }: AvatarProps) => {
    
    const avatarName = typeof name === 'string' ? name[0] : '';

    return (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{avatarName}</span>
        </div>
    );
};


export default BlogCard;

