import React from 'react';
import '../../Assests/Styles/common.css';
import logo from '../../Assests/Images/tickets.png'
import {Link} from 'react-router-dom';
import {FaSearch, FaUserAlt} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../ReduxStores/authSlice';


const Navbar = () => {
  const auth_data = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = ()=>{
    dispatch(logout());
    window.location = '/';
  }
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
            {!auth_data.isAuthenticated 
            ?<li><Link to='/signup'><FaUserAlt /></Link></li>
            :<li><a onClick={handleLogout}>Logout</a></li>}
        </ul>
    </div>
  )
}

export default Navbar