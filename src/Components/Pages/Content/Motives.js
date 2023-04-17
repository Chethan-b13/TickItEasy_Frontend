import React from 'react'
import '../../../Assests/Styles/content.css'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import {GiTicket,GiReceiveMoney} from 'react-icons/gi'


const Motives = () => {
  const icons = [
    {
        ic : <GiTicket/>,
        title : "Book Tickets"
    },
    {
        ic: <AiOutlineAppstoreAdd/>,
        title : "List Your Event"
    },{
        ic : <GiReceiveMoney/>,
        title : "Easy Payment"
    }]
  return (
    <div className='Container'>
        <div className="line"></div>
        <div className="column3">
            {
                icons.map((icon)=>{
                    return <div className="col">
                                {icon.ic}
                                <h3>{icon.title}</h3>
                            </div>
                })
            }
        
        </div>
        <div className="line"></div>
    </div>
  )
}

export default Motives