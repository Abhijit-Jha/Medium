import LoginInfo from '../components/LoginInfo'
import Quote2 from '../components/Quote2'
import './signup.css'
// import { Link} from 'react-router-dom'
const Login = () => {
    return (
        <div className='grid md:grid-cols-2 grid-cols-1'>
           <Quote2/> 
            <LoginInfo/>            
        </div>
    )
}

export default Login
