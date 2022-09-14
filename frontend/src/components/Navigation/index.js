import './Navigation.css'
import {VscAccount, VscGithub, VscBriefcase} from  'react-icons/vsc'
import {AiOutlineLinkedin} from 'react-icons/ai'
import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import LogOut from '../logOutButton'


const Navigation = () => {
    const [showMenu,setShowMenu] = useState(false);

    return (
        <>
            <div className='nav-bar'>

                <div className='left-side'>
                    <Link to={`/`}>diamond door</Link> 
                </div>


                <div className='personal-links'>
                    <div className='gitHub'><a href="github.com"><VscGithub /></a></div>
                    
                    <div className='linkedin'><a href="linkedin.com"><AiOutlineLinkedin /></a></div> 
                   
                    <div className='portfolio'> <a href="portfolio.com"><VscBriefcase /></a></div>
                </div>

                <div className='right-side'>
                    <div><VscAccount className='profile-icon'/></div>
                {/* <div className='nav-logout'><LogOut /></div> */}
                </div>

            </div>
        </>
    )
}

export default Navigation;