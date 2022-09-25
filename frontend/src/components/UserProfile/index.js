import './UserProfile.css'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CompanyInfo from '../companyIndex/CompanyInfo';
import { useEffect } from 'react';
import { fetchFollows } from '../../store/follows';
import { fetchCompanies } from '../../store/companies';
import { VscBriefcase } from  'react-icons/vsc'



export const UserProfile = (props) => {
    const dispatch=useDispatch();
    const user = useSelector(state=>state.session.user);
    const follows = Object.values(useSelector(state=>state.follows))
    const companies = useSelector(state=>state.companies)
    useEffect(()=>{
       if (user) dispatch(fetchFollows(user.id))
        dispatch(fetchCompanies())
    },[])

    const memberSince = (dateString) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
                             "July", "August", "September", "October", "November", "December"
                            ];
        const date = new Date (dateString);
        return monthNames[date.getMonth()] + ' ' + date.getFullYear();

    }
    


    if(!companies[1]) return <>No companies!</>;
    if(!user) return <Redirect to={'/login'}/>
    return(
        <>
        
            <div className="profile-outter-container">
            <div className='profile-follows-header'>
                <h1 >Companies you Follow</h1>
            </div>
                <div className="profile-company-flexer">
                        <div className='profile-user-container'>
                            <div className='profile-user-box'>
                                <img className='user-profile-pic' src="/garret_grad.jpg"  />
                                <h1 className='user-profile-box-name'>{`${user.fName} ${user.lName}`}</h1>
                                <div className='profile-title-since-flex'>
                                    <span className='user-profile-box-icon' >
                                        <  VscBriefcase />
                                        <h1 className='user-profile-box-job-title'>{user.jobTitle}</h1>
                                    </span>
                                    <h1 className='member-since'>Member since: 
                                        {' ' + memberSince(user.createdAt)}
                                    </h1>
                                </div>

                            </div>
                        </div>
                        <div className='profile-companies-container'>
                            {follows.map( follow =>(
                                <span key={follow.id}>
                                    <CompanyInfo company={companies[follow.companyId]}  />
                                </span> 
                            ))}
                            </div>
                   
                </div>
            </div>

        </>
    )
}

{/* <div className='companies-container'>
{companies.map(company => (
    <CompanyInfo company={company} key={company.id} />
     )  
)}
</div> */}