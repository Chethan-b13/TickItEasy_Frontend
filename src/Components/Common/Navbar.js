import React, { useContext, useState } from 'react';
import { FaHamburger, FaSearch, FaUserAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../Assests/Images/tickets.png';
import '../../Assests/Styles/common.css';
import { HomeData } from '../Pages/Home';
import { logout } from '../ReduxStores/authSlice';
import { IoMdCloseCircle } from 'react-icons/io';


const Navbar = () => {
  const homedata = useContext(HomeData);
  const [showDropDown, setshowDropDown] = useState(false);
  const [menuOpen, setmenuOpen] = useState(false)
  const dropDown= ()=>{
    setshowDropDown(!showDropDown);
  }
  return (
    <>
    <div className="menuIcon" style={{background: menuOpen && "none", backdropFilter:  menuOpen && "none"}} onClick={()=>{setmenuOpen(!menuOpen)}}>
      {
        !menuOpen ? <FaHamburger /> : <IoMdCloseCircle />
      }
    </div>
    <div className={`navBar ${menuOpen ? "navBar__visible" : "navBar__hidden"}`}>
        <Link to='/' className="logo">
          <img src={logo} alt="tickit Easy" />
          <h2>TickItEasy</h2>
        </Link>
        {
          homedata?.User?.role !== "Organizer" &&
          <ul className='navigationItems'>
              <li><Link to='/all-events'>Free Events</Link></li>
              <li><Link to='/all-events'>Popular Events</Link></li>
              <li><Link to='/all-events'>Today's Events</Link></li>
          </ul>
        }
        <ul className='navigationItems rightItems'>
            { 
              homedata?.User ?
              homedata?.User?.role === "Organizer" &&
              <li id='listEvent'><Link to={'/create-event'}>List your Event</Link></li>
              :<li id='listEvent'><Link to={"/signup"}>Signup</Link></li>
            }
            <li><Link to=''><FaSearch /></Link></li>
            {!homedata?.User 
            ?<li><Link to='/signup'><FaUserAlt /></Link></li>
            :<li><a onClick={dropDown}>{homedata?.User.email.slice(0,10)}&hellip; <i className="arrowdown"></i> </a></li>}
        </ul>
        <DropDownMenu show={showDropDown} user={homedata?.User} />
    </div>
    </>
  )
}

const DropDownMenu = (props)=>{
  const show  = props.show
  const dispatch = useDispatch();
  const handleLogout = ()=>{
    dispatch(logout());
    window.location = '/';
  }
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