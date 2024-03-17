import { format } from 'date-fns';
import React, { useContext } from 'react';
import {  MdOutlineEventAvailable } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { HomeData } from '../Home';
import { FaPencilAlt } from 'react-icons/fa';


export const TopEvents = () => {
  const {events} = useContext(HomeData);
  return (
    <div className='Container'>
        <h1><MdOutlineEventAvailable/> Top Events</h1>
        {/* <Filters /> */}
        <div className="column3">
          {
            events?.slice(5,10)?.map((event,indx)=>{
              return (
                <div key={indx} style={{height:'auto'}} className="col">
                  <Card event={event}/>
                </div>
              )
            })
          }
        </div>
        <Link to="all-events"><button className='commonButton'>View More</button></Link>
    </div>
  )
}

export const Card = (props) => {
  const date = new Date(props.event.start_time);
  const formattedDate = format(date, "MMMM d | h:mm a");

  return (
    <div className="card">
      <img src={props.event.image} alt="" />
      {
        props?.role === "Organizer"
        ?
        <Link to={`/edit-event/${props.event.slug}`} className='button editButton'><FaPencilAlt /></Link>
        :<Link to={`/event/${props.event.slug}`} className='button'>BUY</Link>
      }
      <div className="details">
        {
          props.event.name.length > 30 ?
            <h3>{props.event.name.slice(0,30)}...</h3>
          : <h3>{props.event.name}</h3>
        }
        <h5>{formattedDate}</h5>
        <h5>{props.event.venue}</h5>
        {
          props?.role === "Organizer" &&
          <p id="ticketsSold"><span>{props?.event?.tickets_booked}</span> Tickets Sold</p>
        }
        <div id="price">
          <p>₹{props.event.price}/- onwards</p>
        </div>
      </div>
      <div id="genre">{props.event.genre}</div>
    </div>
  );
}
