import React from 'react'
import Slider from "react-slick";
import pic1 from '../../Assests/Images/pic1.jpg'
import pic2 from '../../Assests/Images/pic2.jpg'
import pic3 from '../../Assests/Images/pic3.jpg'
import pic4 from '../../Assests/Images/pic4.jpg'
import pic5 from '../../Assests/Images/pic5.jpg'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import './common.css';

const Carousel = () => {
    const images = [pic1, pic2, pic3, pic4, pic5];
    const [imgIndex,setImgIndex] = useState(0)
    const settings = {
        infinite:true, //to allow the slides to show infinitely
        lazyLoad: true,
        speed: 600, //this is the speed of slider in ms
        slidesToShow:3, //number of slides to show up on screen
        centerMode: true, 
        centerPadding: 10,
        nextArrow: <NextArrow />, //imported from 'react-icons'
        prevArrow: <PrevArrow />, //imported from 'react-icons'
        beforeChange: (current, next) => setImgIndex(next), 
      };
    return (
        <div className='carousel'>
            <Slider {...settings}>
                {images.map((img, idx) => (
                <div key={idx} className={idx === imgIndex ? "slide activeSlide" : "slide"}>
                    <img src={img} alt={idx} />
                </div>
                ))}
            </Slider>
        </div>
    )
}


const NextArrow = ({onClick}) => {
    return (
      <div className="arrow_next" onClick={onClick}>
        <FaArrowRight />
      </div>
    )
  }

  const PrevArrow = ({onClick}) => {
    return (
      <div className="arrow_prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    )
  }

export default Carousel