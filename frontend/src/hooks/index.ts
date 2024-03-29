import axios from 'axios';
import { useState, useEffect } from 'react';
export interface BlogInterface{
  "title" : string,
  "content" : string,
  "id" : string,
  "createdAt" : string,
  "author":{
    "name" : string
  }
}
const useBlogs = () => {
  const BACKEND_URL = "https://backend.abhijeetjha913.workers.dev";
  const [loading, setLoading] = useState(true); // Set loading state to true initially
  const [blogs, setBlogs] = useState<BlogInterface[]>([]); 

  useEffect(() => {
    async function fetchData() {
        try {
        console.log("h11")
        setLoading(true);
        const token = localStorage.getItem("token");
        console.log(token)
        if (!token) {
          throw new Error("Token not found"); 
        }

        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: "Bearer "+ token
          }
        });
        console.log(response.data)
        setBlogs(response.data.data);
    } catch (error) {
        console.error("Error fetching blogs:", error);
    } finally {

        setLoading(false); 
      }
    }

    fetchData();
  }, []); 

  return {
    loading,
    blogs
  };
};

export function useSpecificBlog({id}:{id:string}){
  const BACKEND_URL = "https://backend.abhijeetjha913.workers.dev";
  const [loading, setLoading] = useState(true); 
  const [specificBlog, setspecificBlog] = useState<BlogInterface>( ); 

  useEffect(() => {
    async function fetchData() {
        try {
        // console.log("h11")
        setLoading(true);
        const token = localStorage.getItem("token");
        console.log(token)
        if (!token) {
          throw new Error("Token not found"); 
        }

        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/get/${id}`, {
          headers: {
            Authorization: "Bearer "+ token
          }
        });
        console.log(response.data)
        setspecificBlog(response.data.data);
    } catch (error) {
        console.error("Error fetching specificBlog:", error);
    } finally {

        setLoading(false); 
      }
    }

    fetchData();
  }, [id]); 

  return {
    loading,
    specificBlog
  };
}

export default useBlogs;
