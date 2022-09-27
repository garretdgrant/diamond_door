import './companyIndex.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {fetchCompanies} from '../../store/companies'
import { Redirect, Link, useHistory } from 'react-router-dom';
import CompanyInfo from './CompanyInfo';


const CompanyIndex = () => {
    const companies = Object.values(useSelector(state => state.companies))//.slice(0,2)
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user)
    const history = useHistory();

    useEffect(()=>{
        dispatch(fetchCompanies())
    },[])

    if (!sessionUser) history.push('/login');
    if(!companies) return null;
    return (
        <>
            

            <div className='parent-companies-container'>
                 <h1 className='companies-index-header'>Companies Recommended for You</h1>
                <div className='companies-container'>
                        {companies.map(company => (
                            <CompanyInfo company={company} key={company.id} />
                             )  
                        )}
                </div>
            </div>
        </>
    )
}

export default CompanyIndex;