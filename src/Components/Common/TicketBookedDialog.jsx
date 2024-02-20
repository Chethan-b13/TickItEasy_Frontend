import React from 'react'
import "../../Assests/Styles/dialog.css"
import QRCode from "react-qr-code";
import { MdLocationPin } from 'react-icons/md';
import successLotie from "../../Assests/lotie/successful.json"
import { useLottie } from 'lottie-react';

const TicketBookedDialog = ({ticketInfo}) => {
  const options = {
    animationData: successLotie,
    loop: true
  };

  const { View } = useLottie(options);

  return (
    <div className='dailogContainer'>
        <div className="flexBox successPrompt">
          <>
          {View}
          </>
          <h1>Ticket Booked</h1>
        </div>
        <div className="ticketInfo">
          <div className="flexBox gap-20">
            <span className='qr-code'>
              <QRCode bgColor={"#ECE5F0"} value={ticketInfo.booking_reference_code} />
            </span>
            <hr />
            <div className="cellInfo infoColumn">
              <h1>{ticketInfo.event_name}</h1>
              <div className="flexBox venue">
                <MdLocationPin />
                <p>{ticketInfo.venue}</p>
                <p className="tag">{ticketInfo.mode}</p>
              </div>
              <div className="fourGrids">
                <div className="cellInfo">
                  <p>Date</p>
                  <h2>{ticketInfo.start_time.split(" ")[0]}</h2>
                </div>
                <div className="cellInfo">
                  <p>Time</p>
                  <h2>{ticketInfo.start_time.split(" ")[1].split("+")[0]}</h2>
                </div>
                <div className="cellInfo">
                  <p>Number of Tickets</p>
                  <h2>{ticketInfo.num_tickets}</h2>
                </div>
                <div className="cellInfo">
                  <p>Total Price</p>
                  <h2>{ticketInfo.total_price}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flexBox ticketFooteroptions">
          <p onClick={()=>{window.location = "/"}}>Explore More  /</p>
          <p onClick={()=>{window.print()}}>Download</p>
        </div>
    </div>
  )
}

export default TicketBookedDialog