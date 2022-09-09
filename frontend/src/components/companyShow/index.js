import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchCompany } from '../../store/companies'
import './companyShow.css'


const CompanyShow = () => {
    const {companyId}= useParams();
    const company = useSelector(state => state.companies[companyId])
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
                            <div className='company-show-overview'> <p>icon</p> Overview</div>
                            <span className='company-show-break'></span>
                            <div className='company-show-reviews'> <p>###</p> Reviews</div>
                            <span className='company-show-break'></span>
                            <div className='company-show-jobs'> <p>###</p> Jobs</div>
                        </div>
                        <div className='company-show-menu-right'>
                            <div className='company-show-follow'>Follow</div>
                            <div className='company-show-add-review'> <span className='company-review-plus'>+</span> Add a Review</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='company-overview-container'>
                <div className='company-overview-box'>
                    <h1 className='company-overview-header'>{`${company.name} Overview`}</h1>

                    <div className='company-attributes-container'>
                       
                        <div className='left-attributes-container'>
                            <div className='company-attribute-titles-left'>
                                    <div className='company-overview-website'>Website: </div>
                                    <div className='company-overview-size'>Size: </div>
                                    <div className='company-overview-revenue'>Revenue: </div>
                            </div>


                            <div className='company-attribute-values-left'>
                                <div className='company-overview-website-value'>{`${company.website}`}</div>
                                <div className='company-overview-size-value'>{`${company.size}`}</div>
                                <div className='company-overview-revenue-value'>{`${company.revenue}`}</div>
                            </div>
                        </div>

                        <div className='right-attributes-container'>
                            <div className='company-attribute-titles-right'>
                                <div className='company-overview-headquarters'>Headquarters: </div>
                                <div className='company-overview-founded'>Founded: </div>
                                <div className='company-overview-industry'>Industry: </div>
                            </div>

                            <div className='company-attribute-values-right'>
                                <div className='company-overview-headquarters-value'>{`${company.headquarters}`}</div>
                                <div className='company-overview-founded-value'>{`${company.founded}`}</div>
                                <div className='company-overview-industry-value'>{`${company.industry}`}</div>
                            </div>
                        </div>
                    </div>

                    <p className='company-show-about'>{`${company.about}`}</p>
                </div>
            </div>
        </>
    )
    } else {
        return (<>
        <h1 className='no-company-found'>Page Not Found</h1>
        </>)
    }
   
}

export default CompanyShow;