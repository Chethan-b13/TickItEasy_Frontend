import React, { useContext } from 'react';
import {MdOutlineEventAvailable} from 'react-icons/md';
import { HomeData } from '../Home';
import { format } from 'date-fns';
import { Link } from 'react-router-dom'


const TopEvents = () => {
  const {events,user} = useContext(HomeData);
  return (
    <div className='Container'>
        <h1><MdOutlineEventAvailable/> Top Events</h1>
        <div className="column3">
          {
            events?.slice(5,).map((event,indx)=>{
              return (
                <div key={indx} style={{height:'auto'}} className="col">
                  <Card event={event}/>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

const Card = (props) => {
  const date = new Date(props.event.start_time);
  const formattedDate = format(date, "MMMM d | h:mm a");
  return (
    <div className="card">
      <img src={props.event.image} alt="" />
      <Link to={`/event/${props.event.slug}`} className='button'>BUY</Link>
      <div className="details">
        {
          props.event.name.length > 30 ?
            <h3>{props.event.name.slice(0,30)}...</h3>
          : <h3>{props.event.name}</h3>
        }
        <h5>{formattedDate}</h5>
        <h5>{props.event.venue}</h5>
        <div id="price">
          <p>₹{props.event.price}/- onwards</p>
        </div>
      </div>
      <div id="genre">{props.event.genre}</div>
    </div>
  );
}

export default TopEvents