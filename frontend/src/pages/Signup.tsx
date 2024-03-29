import Information from '../components/SignupInfo'
import Quote1 from '../components/Quote1'
import './signup.css'
// import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <div className='md:grid md:grid-cols-2  '>
            <Information/>
            <Quote1/>
        </div>
    )
}

export default Signup
