
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../../../configs/apiConfig';
import { useParams } from 'react-router-dom';
import '../../../Assests/Styles/event.css';
import '../../../Assests/Styles/auth.css';
import EventForm from './EventForm';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../../Common/LoadingScreen';
import Navbar from '../../Common/Navbar';
import { refresh_token } from '../../ReduxStores/authSlice';

const EditEvent = () => {

    const [loading, setloading] = useState(false);
    const [event, setevent] = useState(null);
    const { slug } = useParams();
    const auth_info = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    const getEventDetails = async ()=>{
        try {
            setloading(true)
            const res = await axios.get(`${BASE_URL}/events/${slug}/`,{
                headers:{
                    'Authorization': 'Bearer ' + auth_info.access_token
                }
            })
            setevent(res.data);
        } catch (error) {
            if (error.response?.data.code==="token_not_valid"){
                // console.log("Haha Token Expired",auth_info.token.refresh_token);
                await dispatch(refresh_token(auth_info.refresh_token))
                window.location.reload();
            }else{
                throw error
            } 
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        if (auth_info){
            getEventDetails();
        }else{
            window.location = '/login';
        }
        
    }, [auth_info])
    
    console.log(event,"hehe");

    return (
        <div>
            <Navbar />
            <EventForm setloading={setloading} eventData={event}/>
            {loading &&
            <LoadingScreen />
            }
        </div>
    )
}

export default EditEvent