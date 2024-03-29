import React from 'react'
import Carousel from './Carousel'
import '../../Assests/Styles/common.css';
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className="headerContainer">
        <Navbar />
        <Carousel />
    </div>
  )
}

export default Header