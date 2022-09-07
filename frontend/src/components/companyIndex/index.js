import './companyIndex.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {fetchCompanies} from '../../store/companies'


const CompanyIndex = () => {
    const companies = Object.values(useSelector(state => state.companies))
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchCompanies())
    },[])

    return (
        <>
            {console.log(companies)}
            <h1>Company Index</h1>
            <ul>
                {companies.map(company => {
                    return(
                        <>
                            <li key={company.id}>{company.name}</li>
                            <img src={company.photoUrl} alt="" />
                        </>
                    )
                })}
            </ul>
        </>
    )
}

export default CompanyIndex;