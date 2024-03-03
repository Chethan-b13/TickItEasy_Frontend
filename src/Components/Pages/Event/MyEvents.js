import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Common/Navbar'
import { MdOutlineEventAvailable } from 'react-icons/md'
import { Card } from './TopEvents'
import axios from 'axios'
import { BASE_URL } from '../../../configs/apiConfig'
import LoadingScreen from '../../Common/LoadingScreen'
import { useSelector } from 'react-redux'
import { HomeData } from '../Home'

const MyEvents = () => {

    const [FilteredEvents, setFilteredEvents] = useState(null);
    const [loading, setloading] = useState(false)
    const homedata = useContext(HomeData);

    const auth_info = useSelector(state => state.auth.token)

    const fetchData = async ()=> {
        try {
            setloading(true)
            const response = await axios.get(`${BASE_URL}/events/`,{
                headers:{
                'Authorization': 'Bearer ' + auth_info.access_token
                }
            })
            setFilteredEvents(response.data)
            setloading(false)
        } catch (error) {
                console.log(error);
            throw error
        }
    }

    useEffect( () => {
        fetchData()
    }, [])


    return (
        <div className='Container'>
            <Navbar />
            <h1><MdOutlineEventAvailable/>Your Events</h1>
            {
                loading && <LoadingScreen />
            }
            <div className="column3">
            {   FilteredEvents &&
                FilteredEvents?.map((event,indx)=>{
                return (
                    <div key={indx} style={{height:'auto'}} className="col">
                        <Card event={event} myTickets={true} role={homedata?.User?.role}/>
                    </div>
                )
                })
            }
            </div>
        </div>
    )
}

export default MyEvents