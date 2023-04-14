import React, { useState } from 'react'
import Navbar from '../../Common/Navbar'
import '../../../Assests/Styles/auth.css';
import { Link } from 'react-router-dom';
import { UserAuthForm } from './Form';


export const LoginPage = () => {
  return(
    <>
      <Navbar />
      <UserAuthForm name='Login' />
    </>
  );
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


export const AlreadyMemberOrNot = (props)=>{
  
  return (
    <div className="loginContent">
          <p>{props.message}</p>
          <Link to={props.redirectUrl}>{props.name}</Link>
    </div>
  );
}





export default UserAccountForm