import React, { createContext, useContext, useState } from 'react'
import Navbar from '../Common/Navbar'
import '../../Assests/Styles/auth.css';
import { Link } from 'react-router-dom';
import { FaSignInAlt ,FaFacebookF,FaEye , FaEyeSlash} from 'react-icons/fa';
import {FcGoogle} from 'react-icons/fc'
import {useForm} from 'react-hook-form';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import illustration from '../../Assests/Images/login.svg'


const formContext = createContext();

const LoginSchema = yup.object().shape({
  email: yup.string().email().required("Email is a required!"),
  password: yup.string().required("Password is required!"),
})

const SignupSchema = yup.object().shape({
    email: yup.string().email().required("Email is a required!"),
    password1: yup.string().min(8).max(12).required("Password is required!"),
    password2: yup.string().oneOf([yup.ref('password1'),null],"Password did not match!").required(),
})


export const LoginPage = () => {
  return(
    <>
      <Navbar />
      <UserAuthForm name='Login' />
    </>
  );
}

const UserAuthForm = (props) => {
  let schema;
  {props.name==='Signup'? schema = SignupSchema : schema = LoginSchema}
  const {register , handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <formContext.Provider value={register} >
    <div className='Centered_Container'>
      <div className="formContainer">
        <h1>{props.name} <span><FaSignInAlt/></span> </h1>
        <div className="SocialIcons">
          <h6>Google <FcGoogle /></h6>
          <h6>facebook <FaFacebookF /></h6>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} method="post">
          <p>{errors[Object.keys(errors)[0]]?.message}</p>
          <input type="email" id='email' placeholder='Email Address' {...register("email")} />
          
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
    </formContext.Provider>
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
  const [eyeIcon, seteyeIcon] = useState(false)
  const register = useContext(formContext)
  const showPassword = (item_id)=>{
    var x = document.getElementById(item_id);
    if (x.type === "password") {
      x.type = "text";
      seteyeIcon(true)
    } else {
      x.type = "password";
      seteyeIcon(false)
    }
  }
  return(
    <div className="passwordItems">
      <input type="password" id={props.identity} placeholder={props.placeholder} {...register(props.identity)}/>
      <a onClick={()=>showPassword(props.identity)}>{eyeIcon?<FaEye/> : <FaEyeSlash />}</a>
    </div>
  );
}




export default UserAccountForm