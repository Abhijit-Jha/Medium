import "../pages/signup.css"
import write from "../store/images/write.svg"
import noti from "../store/images/noti.svg"
import { useNavigate } from "react-router-dom"

const AppBar = () => {
  const navigate = useNavigate()
  function handleWrite(){
    navigate("/write")
  }
  return (
    <div className='h-12 flex  justify-between p-2'>
      <div className='font-bold flex flex-col justify-center text-2xl ml-20'>
        Medium
      </div>
      <div className='w-1/3 ml-28'>
        <input type='search' className='ipbox w-40 h-8 rounded-full bg-slate-200 hover:bg-slate-300' placeholder='Search....'></input>
      </div>
      <div className='flex flex-row items-center w-2/3 justify-end space-x-8 mr-20 p-1'>
        <div className='flex text-red-400 cursor-pointer hover:text-black' onClick={handleWrite}><img src={write} className='w-10 h-6' color='red-400'></img>Write</div>
        <div className='cursor-pointer'><img src={noti}/></div>
        <div className=''>
        <Avatar name="Abhijit"></Avatar>
        </div>
      </div>
    </div>
  )
}
interface AvatarType{
    name:String
}
export function Avatar({ name }:AvatarType) {
    return <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer ">
        <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>
}

export default AppBar
