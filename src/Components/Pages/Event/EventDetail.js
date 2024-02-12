
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../../configs/apiConfig'
import { useParams,Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../Common/Navbar'
import { refresh_token } from '../../ReduxStores/authSlice'
import '../../../Assests/Styles/event.css';
import {RiHeartLine,RiHeartFill} from 'react-icons/ri';
import { format } from 'date-fns';
import {MdGroupWork,MdDateRange,MdOutlinePlace} from 'react-icons/md';
import {IoIosWallet} from 'react-icons/io';
import Footer from '../../Common/Footer'


const EventDetail = () => {

    const [event, setevent] = useState(null);
    const [liked, setliked] = useState(false);
    const auth_info = useSelector(state => state.auth.token)
    const { slug } = useParams();
    const dispatch = useDispatch()


    const getEventDetails = async ()=>{
        try {
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
        }
    }
    useEffect(() => {
        console.log(auth_info);
        if (auth_info){
            getEventDetails();
        }else{
            window.location = '/login';
        }
        
    }, [])

    const handleBookTickets = async ()=> {
        try {
            const res = await axios.post(`${BASE_URL}/events/book-ticket`,
            {
                num_tickets: 1,
                booked_date_time: parseInt(+new Date() /1000),
                event: event?.id,
            },
            {
                headers:{
                    'Authorization': 'Bearer ' + auth_info.access_token
                }
            })

            if(res.status === 201){
                console.log("Booked", res.data);
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <Navbar />
            {   event && 
                <div className="container">
                    <div className="rightContent">
                        <img src={event.image} alt={event.name} />
                        <div className="description">
                            <h1>About</h1>
                            <p>{event.description}</p>
                        </div>
                    </div>
                    <div className="leftContent">
                        <div className="card">
                            <div className="title">
                                <h2>{event.name}</h2>

                                {   !liked ? <button onClick={()=>setliked(!liked)}><RiHeartLine/></button>
                                          : <button onClick={()=>setliked(!liked)}><RiHeartFill style={{'color':'red'}}/></button>
                                }
                            </div>
                            <div className="detail_col">
                                <MdGroupWork />
                                <p>{event.genre}</p>
                            </div>
                            <div className="detail_col">
                                <MdDateRange />
                                <p>{format(new Date(event.start_time), "MMMM d | h:mm a")} - {format(new Date(event.end_time), "MMMM d | h:mm a")}</p>
                            </div>
                            <div className="detail_col">
                                <MdOutlinePlace />
                                <p>{event.venue}</p>
                            </div>
                            <div className="detail_col price">
                                <IoIosWallet />
                                <h3>₹{event.price}/- Onwards</h3>
                                <button onClick={handleBookTickets} >BUY NOW</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </>
    )
}

export default EventDetail