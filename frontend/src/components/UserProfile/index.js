import './UserProfile.css'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CompanyIndex from '../companyIndex';
import SingleCompany from '../companyShow/SingleCompany';
import CompanyInfo from '../companyIndex/CompanyInfo';
import { useEffect } from 'react';
import { fetchFollows } from '../../store/follows';
import { fetchCompanies } from '../../store/companies';


export const UserProfile = (props) => {
    const dispatch=useDispatch();
    const user = useSelector(state=>state.session.user);
    const follows = Object.values(useSelector(state=>state.follows))
    const companies = useSelector(state=>state.companies)
    useEffect(()=>{
       if (user) dispatch(fetchFollows(user.id))
        dispatch(fetchCompanies())
    },[])
    


    if(!companies[1]) return <>No companies!</>;
    if(!user) return <Redirect to={'/login'}/>
    return(
        <>
            <h1 className='profile-header' >Hello {user.fName}</h1>
            <div className="profile-outter-container">
            <div className='profile-follows-header'><h1 >Companies you Follow</h1></div>
                <div className="profile-company-flexer">
                  
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