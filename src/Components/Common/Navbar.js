import React from 'react';
import '../../Assests/Styles/common.css';
import logo from '../../Assests/Images/tickets.png'
import {Link} from 'react-router-dom';
import {FaSearch, FaUserAlt} from 'react-icons/fa'


const Navbar = () => {
  return (
    <div className="navBar">
        <Link to='/' className="logo">
          <img src={logo} alt="tickit Easy" />
          <h2>TickItEasy</h2>
        </Link>
        <ul className='navigationItems'>
            <li><Link to=''>Events</Link></li>
            <li><Link to=''>Contact</Link></li>
            <li><Link to=''>About Us</Link></li>
            <li><Link to=''>MyTickets</Link></li>
        </ul>
        <ul className='navigationItems rightItems'>
            {/* <li><Link to=''>SignUp</Link></li> */}
            <li><Link to=''><FaSearch /></Link></li>
            <li><Link to='/signup'><FaUserAlt /></Link></li>
        </ul>
    </div>
  )
}

export default Navbar