import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Blog from './pages/DetailedBlog'
import Blogs from './pages/Blogs'
import "./App.css"
import PostBlog from './pages/PostBlog'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/write" element={<PostBlog/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App