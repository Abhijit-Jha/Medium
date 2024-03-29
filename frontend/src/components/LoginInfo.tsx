import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {SigninType} from "@abhijit-jha/medium-common"
import axios from 'axios'
const LoginInfo = () => {
  const navigate = useNavigate()
  const [login,setLogin] = useState<SigninType>({
    email:"",
    password:""
  })
  async function sendRequest(e:any){
    e.preventDefault()
    
    try{
    const response = await axios.post("https://backend.abhijeetjha913.workers.dev/api/v1/user/signin",login)
    console.log(response.data)
    navigate("/blogs")

    }catch(e){
        console.log("The error is  : ",e)
    }
  }
  // console.log(login)
  return (
    <div className="h-screen flex justify-center items-center">
      <div className='w-1/2'>
        <div className="font-bold text-2xl text-center">Welcome Back</div>
        <div className='font-extralight text-slate-400 text-center tracking-wider mb-4'>Enter information to login into your account</div>
        <form className='space-y-4'>
          <div className="space-y-2">
            <label htmlFor="email">Email</label> <br></br>
            <input type="email" id="email" required placeholder="" className="ipbox" onChange={(e)=>{
              e.preventDefault()
                setLogin({
                    ...login,
                    email : e.target.value
                })}}></input>
          </div>
          <div className="space-y-2">
            <label htmlFor="password">Password</label> <br></br>
            <input type="password" id="password" required className="ipbox" onChange={(e)=>{
              e.preventDefault()
                setLogin({
                    ...login,
                    password : e.target.value
                })}}></input>
          </div>
          <div className='text-end'><a href='#'>Forget Password?</a></div>
          <div>
            <button className='bg-black text-white w-full p-2 rounded-xl text-xl' onClick={sendRequest}>Login</button>
          </div>
          <div className='text-center'>
            <span>Don't have an account?</span><Link to='/signup'>Create new</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginInfo
