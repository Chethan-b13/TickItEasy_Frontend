import React, { createContext, useEffect, useState } from 'react'
import Header from '../Common/Header'
import Motives from './Content/Motives'
import {TopEvents} from './Event/TopEvents'
import { FetchAllEvents } from './Event/EventApis'
import { BASE_URL } from '../../configs/apiConfig'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { refresh_token } from '../ReduxStores/authSlice'
import Footer from '../Common/Footer'
import MyEvents from './Event/MyEvents'

export const HomeData = createContext()

const Home = () => {
  const dispatch = useDispatch()
  const [events, setevents] = useState(null);
  const [user, setuser] = useState(null);
  const auth_info = useSelector((state)=>state.auth);
  const homedata = {
    events:events,
    User: user
  }

  const getuserDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/getuserinfo/`,{
        headers:{
          'Authorization': 'Bearer ' + auth_info.token.access_token
        }
      })
      setuser(response.data)
    } catch (error) {
      if (error.response?.data.code==="token_not_valid"){
            // console.log("Haha Token Expired",auth_info.token.refresh_token);
            await dispatch(refresh_token(auth_info.token.refresh_token))
            window.location = '/'; 
        }else{
          throw error
        }
    }
  }

  useEffect(() => {
    FetchAllEvents(dispatch,setevents);
    if(auth_info.isAuthenticated){
      getuserDetails();
    }
  }, [auth_info.isAuthenticated])
  

  return (
    <div className="homeContainer">
        <HomeData.Provider value={homedata} >
            
            {
              !user || user?.role === "Customer" ?
              <>
              <Header />
              <Motives />
              <TopEvents />
              </>
              : <MyEvents />
            }
            
            <Footer />
        </HomeData.Provider>
    </div>
  )
}

export default Home