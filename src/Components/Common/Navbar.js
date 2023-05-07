import React, { useContext, useState } from 'react';
import '../../Assests/Styles/common.css';
import logo from '../../Assests/Images/tickets.png'
import {Link} from 'react-router-dom';
import {FaSearch, FaUserAlt} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../ReduxStores/authSlice';
import { HomeData } from '../Pages/Home';


const Navbar = () => {
  const homedata = useContext(HomeData);
  const [showDropDown, setshowDropDown] = useState(false);

  const dropDown= ()=>{
    setshowDropDown(!showDropDown);
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
            {!homedata?.User 
            ?<li><Link to='/signup'><FaUserAlt /></Link></li>
            :<li><a onClick={dropDown}>{homedata?.User.email.slice(0,10)}&hellip; <i className="arrowdown"></i> </a></li>}
        </ul>
        <DropDownMenu show={showDropDown} user={homedata?.User} />
    </div>
  )
}

const DropDownMenu = (props)=>{
  const show  = props.show
  const dispatch = useDispatch();
  const handleLogout = ()=>{
    dispatch(logout());
    window.location = '/';
  }
  console.log(props.user);
  return (
      <div className="dropDownContainer" style={{display:show?'block':'none'}}>
          <ul className='navigationItems dropdown'>
            <li><a onClick={handleLogout}>Logout</a></li>
            <div className='optionLine'></div>
            {props.user?.role==='Organizer'? <li><Link to={'/event'} >Create Event</Link></li>
            : <li><a>Profile</a></li>
            }
            
          </ul>
      </div>
  );
}

export default Navbar