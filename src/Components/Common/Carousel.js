import React, { useContext, useState } from 'react'
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
import '../../Assests/Styles/common.css';
import '../../Assests/Styles/carousel.css';
import { Link } from 'react-router-dom'
import {format} from 'date-fns'
import { HomeData } from '../Pages/Home'

const Carousel = () => {
    const {events,User} = useContext(HomeData);
    const images = [pic1, pic2, pic3, pic4, pic5];
    const [imgLoaded, setimgLoaded] = useState(false);
    let counter = 0;
    const handleLoad = (event)=>{
      counter++;
      if(counter===4){
        setimgLoaded(true);
      }
    }

    
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
                    depth: 200,
                    modifier: 3.5,
                    slideShadows:false,
                  }
                }
                pagination={{el:'.swiperPagination', clickable: true }}
                grabCursor={true}
                centeredSlides={true}
                speed={450}
                loop
                loopedSlides={2}
                loopadditionalslides={2}
              >
              {events ? events?.slice(0,5).map((event,indx)=>{
                return <SwiperSlide key={indx}>
                        {   
                            <>
                            <div style={{display:imgLoaded?"block":"none"}}>
                              <img key={indx}  width="350px" height={"250px"} src={event.image} alt={indx} onLoad={handleLoad}/>
                              <div className="imgContent">
                                {/* <h1 className='date'>{event.start_time.split("T")[0]}</h1> */}
                                <h1 className='date'>{format(new Date(event.start_time),"do MMMM yyyy")}</h1>
                                <Link to="#" className='bookButton' >Book Now</Link>
                              </div>
                            </div>
                            <div id='imgloading' style={{display:imgLoaded?"none":"block"}}></div>
                            </>
                        }
                      </SwiperSlide>
              })
            : images.map((img,i)=>{
              return <SwiperSlide key={i}>
                        <div id='imgloading' style={{display:imgLoaded?"none":"block"}}></div>
                  </SwiperSlide>
            })
            }
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