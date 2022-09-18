import './Navigation.css'
import {VscAccount, VscGithub, VscBriefcase} from  'react-icons/vsc'
import {AiOutlineLinkedin} from 'react-icons/ai'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/session'


const Navigation = () => {
    const dispatch = useDispatch();
    const user = useSelector(state=> state.session.user)
    const history = useHistory();
    const handleLog =(e)=>{
        e.preventDefault();
        if (user) dispatch(logout()).then(
            <Redirect to={'/login'}/>
        );
        history.push('/login')
      
    }


    return (
        <>
            <div className='nav-bar'>

                <div className='left-side'>
                    <Link to={`/`}>diamond door</Link> 
                </div>


                <div className='personal-links'>
                    <div className='gitHub'><a href="https://github.com/garretdgrant"><VscGithub /></a></div>
                    
                    <div className='linkedin'><a href="https://www.linkedin.com/in/garret-d-grant/"><AiOutlineLinkedin /></a></div> 
                   
                    <div className='portfolio'> <a href="portfolio.com"><VscBriefcase /></a></div>
                </div>

                <div className='right-side'>
                   
                        <div className='nav-modal-container'>
                            <div className='nav-modal'>
                                <button onClick={()=>history.push('/profile')}>Profile</button>
                                {/* <button>button</button> */}
                                <button onClick={handleLog}>{user ? 'Log Out' : 'Sign In'}</button>
                            </div>
                            <VscAccount  className='profile-icon'/>
                       
                    </div>
                </div>

            </div>
        </>
    )
}

export default Navigation;