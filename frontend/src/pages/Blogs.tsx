// import React from 'react'

// import axios from "axios";
import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import useBlogs from "../hooks";

const Blogs = () => {
  const {loading,blogs} = useBlogs()
  console.log(blogs)
  if(loading){
    return (
      <div>
        <AppBar />
        <div className="space-y-4 h-screen">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="p-4 bg-white rounded-xl shadow-lg animate-pulse flex justify-center ">
              
              <div className="h-4 bg-gray-200 mb-2 w-2/3"></div>
              <div className="h-4 bg-gray-200 mb-2 w-1/2"></div>
              <div className="h-4 bg-gray-200 mb-2 w-full"></div>
              <div className="h-4 bg-gray-200 mb-2 w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  

  return (
    <div>
      <AppBar/>
    <div className="space-y-4  h-screen">
      {blogs.map(blog=>{
         return <BlogCard
         id={blog.id}
        authorName={blog.author.name}
        publishedAt={blog.createdAt.slice(0,10)}
        title={blog.title}

        content={blog.content}
      />

      })}
            
    </div>
    </div>
  );
};

export default Blogs;
