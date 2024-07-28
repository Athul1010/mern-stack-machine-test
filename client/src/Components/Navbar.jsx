import React, { useState } from 'react'

import { BiSearch } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";

import '../Styles/Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [showSidebar, setShowSidebar] = useState(false);
    const [showHowItWorksOptions, setShowHowItWorksOptions] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const closeSidebar = () => {
        setShowSidebar(false);
    };

    const toggleHowItWorksOptions = () => {
        setShowHowItWorksOptions(!showHowItWorksOptions);
    };

    return (
        <div className="navbar">
            <div className="navbar-logo">
                <h3>DealsDray</h3>
            </div>
            <div className={`menu-icon ${showSidebar ? 'active' : ''}`} onClick={toggleSidebar}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            <ul className='navbar-options'>
                <Link to={'/dashboard'}><div>Home</div></Link>
                {/* <Link to={'/about/'}><div>About Us</div></Link>
                <li className="dropdown">
                    How it works
                    <ul className="dropdown-content">
                        <Link to={'/linux-client-configuration/'}><li>Linux Client Configuration</li></Link>
                        <Link to={'/windows-client-setup-configuration/'}><li>Windows Client Configuration</li></Link>
                        <Link to={'/macos-client-configurations/'}><li>MacOS Client Configuration</li></Link>
                    </ul>
                </li> */}
                <Link to={'/table'}><div>Employee List</div></Link>
                <Link to={''}><div>Hukum Gupta -</div></Link>
                <Link to={'/'}><div>Logout</div></Link>
                {/* <div><BiSearch /></div> */}
            </ul>

            <div className={`sidebar ${showSidebar ? 'active' : ''}`}>
                <div className="close-section">
                    <div className='close-btn'>
                        <button onClick={closeSidebar}><AiOutlineCloseCircle /></button>
                    </div>
                </div>

                <div className="options-section">
                    <Link to={'/dashboard'}><div>Home</div></Link>
                    <Link to={''}><div>Employee List</div></Link>
                    <Link to={''}><div>Hukum Gupta -</div></Link>
                    <Link to={''}><div>Logout</div></Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar