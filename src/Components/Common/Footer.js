import React from 'react'
import '../../Assests/Styles/common.css';
import '../../Assests/Styles/footer.css';
import logo from '../../Assests/Images/tickets.png'
import { Link } from 'react-router-dom'
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
  return (
    <div className='footerContainer'>
        <Link to='/' className="logo">
          <img src={logo} alt="tickit Easy" />
          <h2>TickItEasy</h2>
        </Link>
        <p>
        TickItEasy is a platform that helps you discover and buy the best in events, travel and food in your city. 
        We strive to curate experiences that are worth your time and money, possibly something you have never tried before.
        </p>
        <h1>FOR EVENT ORGANIZERS</h1>
        <p>
        TickItEasy is built by Chethan B and I sure know what goes into putting together a great experience. 
        Our technology, marketing and customer support can help you build a community of not just ticket buyers, but also fans.
        </p>
        <div className="flexNavigators">
            <Link to='/' >About Us</Link>
            <Link to='/' >Blog</Link>
            <Link to='/' >Careers</Link>
            <Link to='/' >Terms & Conditions</Link>
            <Link to='/' >Contact Us</Link>
        </div>
        <div className="flexNavigators">
            <h4>Find Me on :</h4>
            <Link to='https://www.linkedin.com/in/chethan-b-31b58a192/' target='_blank'><FaLinkedin /></Link>
            <Link to='https://www.instagram.com/_chethan_cheths' target='_blank'><FaInstagram /></Link>
            <Link to='mailto:chethanb1321@gmail.com' ><MdEmail /></Link>
        </div>
    </div>
  )
}

export default Footer