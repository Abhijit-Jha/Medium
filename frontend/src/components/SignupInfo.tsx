import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { SignupType } from '@abhijit-jha/medium-common'
import axios from 'axios'

const Information = () => {
    const navigate = useNavigate()
    const [inputs,setInputs] = useState<SignupType>({
        email : "",
        password:"",
        name:""
    })
    const [confirmPassword,setConfirmPassword]=useState("")
    // console.log(inputs)
    const BACKEND_URL="https://backend.abhijeetjha913.workers.dev"
    async function sendRequest (e:any){
        e.preventDefault()
        if(confirmPassword!=inputs.password){
            console.error("Mismatch password")
            return
        }
        try{
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,inputs)
        const jwt=response.data
        console.log(jwt.token)
        localStorage.setItem("token",jwt.token)
        navigate("/signin")
        }catch(e){
            console.log("The error is  : ",e)
        }
    }
  return (
    <div className="h-screen flex justify-center items-center">
      <div className='w-1/2'>
        <div className="font-bold text-2xl text-center">Create an account</div>
        <div className='font-extralight text-slate-400 text-center tracking-wider mb-4'>Enter information to create an account</div>
        <form className='space-y-2'>
          <div className="space-y-2">
            <label htmlFor="name">Full Name</label> <br></br>
            <input type="text" id="name" placeholder="Abhijit Jha" autoFocus className="ipbox" onChange={(e)=>{
                e.preventDefault()
                setInputs({
                    ...inputs,
                    name : e.target.value
                })
            }}></input>
          </div>
          <div className="space-y-2">
            <label htmlFor="email">Email</label> <br></br>
            <input type="email" id="email" required placeholder="example@example.com" className="ipbox" onChange={(e)=>{
                e.preventDefault()
                setInputs({
                    ...inputs,
                    email : e.target.value
                })}}></input>
          </div> 
          <div className="space-y-2">
            <label htmlFor="password">Password</label> <br></br>
            <input type="password" id="password" required className="ipbox" onChange={(e)=>{
                e.preventDefault()
                setInputs({
                    ...inputs,
                    password : e.target.value
                })}}></input>
          </div>
          <div className="space-y-2">
            <label htmlFor="cpassword">Confirm Password</label> <br></br>
            <input type="password" id="cpassword" required className="ipbox" onChange={(e)=>{
                setConfirmPassword(e.target.value)
            }}></input>
          </div>
          <div>
            <input type="checkbox" required className='cursor-pointer' /> I agree to the <a href="#">Terms and Condition</a>
          </div>
          <div>
            <button className='bg-black text-white w-full p-2 rounded-xl text-xl' onClick={sendRequest}>Sign Up</button>
          </div>
          <div className='text-center'>
            <span>Already have an account?</span><Link to="/signin">Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Information
