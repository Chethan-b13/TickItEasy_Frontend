import React, { useState } from 'react'
import Navbar from '../Common/Navbar'
import '../../Assests/Styles/auth.css';
import { Link } from 'react-router-dom';
import { FaSignInAlt ,FaFacebookF,FaEye} from 'react-icons/fa';
import {FcGoogle} from 'react-icons/fc'
import illustration from '../../Assests/Images/login.svg'


export const LoginPage = () => {
  return(
    <>
      <Navbar />
      <UserAuthForm name='Login' />
    </>
  );
}

const UserAuthForm = (props) => {
  return (
    <div className='Centered_Container'>
      <div className="formContainer">
        <h1>{props.name} <span><FaSignInAlt/></span> </h1>
        <div className="SocialIcons">
          <h6>Google <FcGoogle /></h6>
          <h6>facebook <FaFacebookF /></h6>
        </div>
        <form action="" method="post">
          <input type="email" name="email" id='email' placeholder='Email Address' />
          {props.name==="Signup"
          ? <>
          <PasswordInput identity={'password1'} placeholder={'Password'}/>
          <PasswordInput identity={'password2'} placeholder={'Confirm Password'}/>
          </>
          : <PasswordInput identity={'password'} placeholder={'Password'}/>
          }
          
          <button type="submit">{props.name}</button>
        </form>
        {
          props.name==='Signup'
          ?<AlreadyMemberOrNot message='Already a Member ?' redirectUrl={'/login'} name={'Login'} />
          :<AlreadyMemberOrNot message='Create an Account ?' redirectUrl={'/signup'} name={'Signup'} />
        }
        
        <div className="crop">
            <img src={illustration} alt="" />
        </div>
      </div>
    </div>
  )
}

const UserAccountForm = () => {
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
              <AlreadyMemberOrNot message='Already a Member ?' redirectUrl='/login' name='Login' />
          </div>
          : <UserAuthForm name='Signup' />
        }
    </div>
  )
}


const AlreadyMemberOrNot = (props)=>{
  
  return (
    <div className="loginContent">
          <p>{props.message}</p>
          <Link to={props.redirectUrl}>{props.name}</Link>
    </div>
  );
}

const PasswordInput = (props) => {
  const showPassword = (item_id)=>{
    var x = document.getElementById(item_id);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  return(
    <div className="passwordItems">
      <input type="password" name={props.identity} id={props.identity} placeholder={props.placeholder}/>
      <Link onClick={()=>showPassword(props.identity)}><FaEye/></Link>
    </div>
  );
}




export default UserAccountForm