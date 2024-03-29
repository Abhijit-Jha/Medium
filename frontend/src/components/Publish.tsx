import React, { useState } from "react";
import AppBar from "./AppBar";
import Publishbar from "./Publishbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleContent(e) {
    setContent(e.target.value);
  }

  // Function to handle the publish action
  async function handlePublish() {
    const BACKEND_URL = "https://backend.abhijeetjha913.workers.dev";
    try {
      const token = localStorage.getItem("token");
      console.log(token)
      // Making a POST request to publish the blog post
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/post`,
        {
          title: title,
          content: content
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          }
        }
      );
      console.log('hehehe')
      navigate("/blogs")
      console.log(response.data); // Log response data
    } catch (error) {
      console.error("Error publishing blog post:", error);
    }
  }

  return (
    <div>
      <Publishbar onPublish={handlePublish} /> {/* Component to trigger publish action */}
      <div className="flex justify-center">
        <div className="space-y-12 pt-10">
          <div>
            <input
              type="text"
              placeholder="Title..."
              autoFocus
              className="h-16 placeholder:text-3xl  placeholder:pl-2 w-96"
              onChange={handleTitle}
            ></input>
          </div>
          <div className="">
            <textarea
              placeholder="Tell your story..."
              autoFocus
              className="h-20 placeholder:text-xl w-96"
              onChange={handleContent}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publish;
