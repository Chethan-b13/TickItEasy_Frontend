import React from 'react'
import {MdOutlineEventAvailable} from 'react-icons/md'


const TopEvents = () => {
  const loop = [1,2,3,4,5,6]
  return (
    <div className='Container'>
        <h1><MdOutlineEventAvailable/> Top Events</h1>
        <div className="column3">
          {
            loop.map((num,indx)=>{
              return (
                <div key={indx} style={{height:'auto'}} className="col">
                  <Card />
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

const Card = () => {
  return (
    <div className="card">

    </div>
  );
}

export default TopEvents