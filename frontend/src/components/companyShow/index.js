import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchCompany } from '../../store/companies'
import './companyShow.css'


const CompanyShow = () => {
    const {companyId}= useParams();
    const company = useSelector(state => state.companies.company)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchCompany(companyId))
    },[companyId])
 

    if (company){
         return (
        <>
            <div className='company-show-container'>
                <div className='company-show-nav'>
                    <div className='company-show-banner'><img src="../banner.png" alt="" /></div>
                    <div className='company-show-logo'><img src={`${company.photoUrl}`} alt="" /></div>
                    <div className='company-show-name'><h1 > {company.name}</h1></div>
                    <div className='company-show-bottom-menu'>
                        <div className='company-show-menu-left'>
                            <div className='company-show-reviews'>Reviews</div>
                            <div className='company-show-break'></div>
                            <div className='company-show-jobs'>Jobs</div>
                        </div>
                        <div className='company-show-menu-right'>
                            <div className='company-show-follow'>Follow</div>
                            <div className='company-show-add-review'>+ Add Review</div>
                        </div>
                    </div>
            </div>
           
             
            </div>
            <p>{`${company.about}`}</p>
        </>
    )
    } else {
        return (<></>)
    }
   
}

export default CompanyShow;