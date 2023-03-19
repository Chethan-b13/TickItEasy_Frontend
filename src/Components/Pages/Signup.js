import React, { useState } from 'react'
import Navbar from '../Common/Navbar'
import '../../Assests/Styles/auth.css';
import { Link } from 'react-router-dom';
import { FaSignInAlt ,FaFacebookF,FaEye} from 'react-icons/fa';
import {FcGoogle} from 'react-icons/fc'
import ill from '../../Assests/Images/agree.svg'

const Signup = () => {
  const [userRole, setuserRole] = useState()
  return (
    <div>
        <Navbar />
        {
          !userRole
          ?<div className="Centered_Container">
              <h1>TELL US WHAT YOU'RE LOOKING FOR ?</h1>
              <div className="buttons">
                  <button onClick={()=>setuserRole("Host")}>EventHost</button>
                  <button onClick={()=>setuserRole("Customer")}>Book Tickets</button>
              </div>
              <div className="loginContent">
                <p>Already a Member ?</p>
                <Link to={'/'}>Login</Link>
              </div>
          </div>
          : <SignupForm />
        }
    </div>
  )
}


const SignupForm = () => {

  const showPassword = (item_id)=>{
    var x = document.getElementById(item_id);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  return (
    <div className='Centered_Container'>
      <div className="formContainer">
        <h1>Signup <span><FaSignInAlt/></span> </h1>
        <div className="SocialIcons">
          <h6>Google <FcGoogle /></h6>
          <h6>facebook <FaFacebookF /></h6>
        </div>
        <form action="" method="post">
          <input type="email" name="email" id='email' placeholder='Email Address' />
          <div className="passwordItems">
            <input type="password" name="password1" id="password1" placeholder='Password'/>
            <a onClick={()=>showPassword('password1')}><FaEye/></a>
          </div>
          <div className="passwordItems">
            <input type="password" name="password2" id="password2" placeholder='Confirm Password'/>
            <a onClick={()=>showPassword('password2')}><FaEye/></a>
          </div>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  )
}


export default Signup