import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams, Link } from 'react-router-dom'
import { fetchCompany } from '../../store/companies'
import { deleteReview } from '../../store/reviews'
import './companyShow.css'


const CompanyShow = () => {
    const {companyId}= useParams();
    const company = useSelector(state => state.companies[companyId])
    const reviews = Object.values(useSelector(state=> state.reviews))
    const user = useSelector(state=>state.session.user)
    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchCompany(companyId))
    },[companyId])

    const handleDeleteReview = e => {
        e.preventDefault();
        console.log(e.target.value)
        // dispatch(deleteReview(e.target.value))

    }

    const handleUpdateReview = e => {
        e.preventDefault();
        console.log('inside update review function')
    }
 

    if (company && reviews){
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
                            <Link className='company-show-add-review' to={`/add-review/${company.id}`}>
                                <div className='company-show-add-review-div'> 
                                    <span className='company-review-plus'>+</span>
                                    <p className='add-review-text'>Add a Review</p> 
                                </div>
                             </Link>
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

            <div className='company-show-reviews-container'>
                <div className='company-show-reviews-box'>
                    <h1 className='company-overview-header'>{company.name} Reviews</h1>
                </div>
                {reviews.map( review => {return(
                    <>
                        <div className='company-show-reviews-box'>

                            <div className='individual-review-container'>
                                <p>Rating: {review.rating} </p> 
                                <p>{review.currentEmployee ? 'current employee' : 'former employee'}</p> 
                                <p>Headline: {review.headline}</p>
                                <p>Job Title: {review.jobTitle}</p> 
                                <p>Pros: {review.pros}</p><br />
                                <p>Cons: {review.cons}</p>
                                <p>Advice to Management: {review.advice}</p>
                                {user.id === review.userId ? <button className='update-review-button' value={review.id} onClick={handleUpdateReview}>Udate Review</button>  : null}
                                {user.id === review.userId ? <button className='delete-review-button' value={review.id} onClick={handleDeleteReview}>Delete Review</button>  : null}
                                <br />
                            </div>
                        </div>
                    </>
                    )})}
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