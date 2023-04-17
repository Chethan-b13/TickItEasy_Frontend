import React from 'react'
import Header from '../Common/Header'
import Motives from './Content/Motives'
import TopEvents from './Event/TopEvents'

const Home = () => {
  return (
    <div className="homeContainer">
        <Header />
        <Motives />
        <TopEvents />
    </div>
  )
}

export default Home