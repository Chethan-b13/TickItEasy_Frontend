import React,{createContext, useContext,useState} from 'react'
import {FcGoogle} from 'react-icons/fc'
import {useForm} from 'react-hook-form';
// import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import illustration from '../../../Assests/Images/login.svg'
import { FaSignInAlt,FaEye , FaEyeSlash} from 'react-icons/fa';
import { AlreadyMemberOrNot } from './UserAccountForm';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../ReduxStores/authSlice';
import axios from 'axios';
import { BASE_URL } from '../../../configs/apiConfig';
import LoadingScreen from '../../Common/LoadingScreen';
import { LoginSchema, SignupSchema } from '../../Common/FormSchemas';

const formContext = createContext();

export const UserAuthForm = (props) => {
    const dispatch = useDispatch();
    const [Custom_message, setCustom_message] = useState(null)
    let schema = props.name==='Signup'? SignupSchema : LoginSchema;
    const [loading, setloading] = useState(false)
    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
    
    const {register , handleSubmit, formState:{errors}} = useForm({
      resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
      setloading(true)
      if (props.name === 'Signup'){
        const {email,password1,password2} = data
        const role = props.role
        try {
          const response = await axios.post(`${BASE_URL}/auth/register/`,{email,password1,password2,role});
          if (response.data?.Error){
            setCustom_message(response.data?.Error)
          }else{
            setCustom_message(response.data?.Success)
            window.location = '/login'
          }
        } catch (error) {
          console.log("Api request Failed",error)
        }finally{
          setloading(false)
        }
      }else{
        try {
          await dispatch(login(data.email,data.password))
          window.location = '/'
        } catch (error) {
          console.log(isAuthenticated)
          if (!isAuthenticated){
            setCustom_message('Invalid email or password. Please try again.')
          }
          throw error
        } finally {
          setloading(false)
        }
      }
      
    }
  
    return (
      <formContext.Provider value={register} >
      <div className='Centered_Container'>
        <div className="formContainer">
          <h1>{props.name} <span><FaSignInAlt/></span> </h1>
          <div className="SocialIcons">
            <h6>Google <FcGoogle /></h6>
            {/* <h6>facebook <FaFacebookF /></h6> */}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} method="post">
            <p>{errors[Object.keys(errors)[0]]?.message || Custom_message }</p>
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
      {loading && <LoadingScreen />}
      </formContext.Provider>
    )
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
  