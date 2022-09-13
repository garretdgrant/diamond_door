import './companyIndex.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {fetchCompanies} from '../../store/companies'
import { Redirect, Link } from 'react-router-dom';


const CompanyIndex = () => {
    const companies = Object.values(useSelector(state => state.companies))//.slice(0,2)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchCompanies())
    },[])



    return (
        <>
            
            <h1 className='companies-index-header'>Companies Recommended for You</h1>

            <div className='parent-companies-container'>
                <div className='companies-container'>
                        {companies.map(company => {
                            {console.log(company.photoUrl)}
                            return(
                                <>
                                    <Link to={`/companies/${company.id}`}>
                                       <div className={`${company.name}-container`} >
                                        <img src={company.photoUrl} alt="" />
                                        <li  key={company.id}>{company.name}</li>
                                        <p className='companies-index-rating'>rating</p>
                                        <span className='companies-index-counts'>jobs - reviews</span>
                                        <p>{company.about}</p>
                                        </div>
                                    </Link>
                                 
                                
                                </>
                            )
                        })}
                </div>
            </div>
        </>
    )
}

export default CompanyIndex;