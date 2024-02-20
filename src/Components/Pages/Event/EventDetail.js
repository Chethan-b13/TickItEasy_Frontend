
import axios from 'axios'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { AiFillMinusSquare } from 'react-icons/ai'
import { IoIosWallet } from 'react-icons/io'
import { MdAddBox, MdDateRange, MdGroupWork, MdOutlinePlace } from 'react-icons/md'
import { RiHeartFill, RiHeartLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import '../../../Assests/Styles/event.css'
import ticketAnimation from "../../../Assests/lotie/ticket-booking.json"
import { BASE_URL } from '../../../configs/apiConfig'
import Footer from '../../Common/Footer'
import LoadingScreen from '../../Common/LoadingScreen'
import Navbar from '../../Common/Navbar'
import SnackBar from '../../Common/SnackBar'
import { refresh_token } from '../../ReduxStores/authSlice'
import TicketBookedDialog from '../../Common/TicketBookedDialog'

const EventDetail = () => {

    const [event, setevent] = useState(null);
    const [liked, setliked] = useState(false);
    const [loading, setloading] = useState(false);
    const [ticketSize, setticketSize] = useState(1);
    const auth_info = useSelector(state => state.auth.token);
    const [ticketStatus, setticketStatus] = useState("");
    const [bookingDetails, setbookingDetails] = useState(null)
    const { slug } = useParams();
    const dispatch = useDispatch()


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

    const handleBookTickets = async ()=> {
        try {
            setticketStatus("loading");
            const res = await axios.post(`${BASE_URL}/events/book-ticket`,
            {
                num_tickets: parseInt(ticketSize),
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
                setTimeout(() => {
                    setticketStatus("success");
                    setbookingDetails(res.data)
                }, 3000);

            }

        } catch (error) {
            console.log(error);
        }
    }

    const updateTicketSize = (value)=> {
        setticketSize(prev => {
            if(prev===1 && value===-1) return 1;
            return prev + value
        })
    }

    // ###### SnackBar ##############
    const prompts = [
        "Booking your tickets...",
        "Fasten Your seat belts",
        "Almost Done...",
    ]

    return (
        <>
            <Navbar />
            {
                bookingDetails && <TicketBookedDialog ticketInfo={bookingDetails} />
            }
            {
                loading && <LoadingScreen />
            }
            {   event && 
                <>
                {
                    ticketStatus==="loading" &&
                    <SnackBar prompts={prompts} lotie={ticketAnimation} />
                }
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
                            <div className="price">
                                <div className="detail_col ticketSize">
                                    <AiFillMinusSquare onClick={()=>{updateTicketSize(-1)}}/>
                                    <input type="text" value={ticketSize}/>
                                    <MdAddBox onClick={()=>{updateTicketSize(1)}} />
                                </div>
                                <div className="detail_col">
                                    <IoIosWallet />
                                    <h3>₹{event.price}/- Onwards</h3>
                                    <button onClick={handleBookTickets} >BUY NOW</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                </>
            }
        </>
    )
}

export default EventDetail