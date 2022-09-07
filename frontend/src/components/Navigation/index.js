import './Navigation.css'
import {VscAccount, VscGithub, VscBriefcase} from  'react-icons/vsc'
import {AiOutlineLinkedin} from 'react-icons/ai'
import { useState } from 'react'


const Navigation = () => {
    const [showMenu,setShowMenu] = useState(false);

    return (
        <>
            <div className='nav-bar'>

                <div className='left-side'>
                    LOGO
                </div>

                <div className='personal-links'>
                    <VscGithub />
                    <AiOutlineLinkedin />
                    <VscBriefcase />
                </div>

                <div className='right-side'>
                    <VscAccount />      
                </div>

            </div>
        </>
    )
}

export default Navigation;