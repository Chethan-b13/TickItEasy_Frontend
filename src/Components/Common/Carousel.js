import React from 'react'
import pic1 from '../../Assests/Images/pic1.jpg'
import pic2 from '../../Assests/Images/pic2.jpg'
import pic3 from '../../Assests/Images/pic3.jpg'
import pic4 from '../../Assests/Images/pic4.jpg'
import pic5 from '../../Assests/Images/pic5.jpg'
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import './common.css';

const Carousel = () => {
    const images = [pic1, pic2, pic3, pic4, pic5];
    return (
              <>
                <Swiper
                modules={[EffectCoverflow,Navigation, Pagination]}
                effect= {'coverflow'}
                navigation={
                  {
                    nextEl: '.arrow_next',
                    prevEl: '.arrow_prev',
                    clickable:true,
                  }
                }
                slidesPerView={'auto'}
                coverflowEffect={
                  {
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 3.5,
                    slideShadows:false,
                  }
                }
                pagination={{el:'.swiperPagination', clickable: true }}
                grabCursor={true}
                centeredSlides={true}
                speed={400}
                loop
                loopedSlides={2}
                autoplay={{delay: 5000}}
              >
              {images.map((img,indx)=>{
                return <SwiperSlide key={indx}><img width="350px" height={"250px"} src={img} alt={indx} /></SwiperSlide>
              })}
              </Swiper>
              <div className="swiper-controller">
                <PrevArrow />
                <div style={{width:'auto'}} className="swiperPagination"></div>
                <NextArrow />
              </div>
              </>
    )
}


const NextArrow = ({onClick}) => {
    return (
      <div className="arrow arrow_next" onClick={onClick}>
        <IoIosArrowDroprightCircle />
      </div>
    )
  }

  const PrevArrow = ({onClick}) => {
    return (
      <div className="arrow arrow_prev" onClick={onClick}>
        <IoIosArrowDropleftCircle />
      </div>
    )
  }

export default Carousel