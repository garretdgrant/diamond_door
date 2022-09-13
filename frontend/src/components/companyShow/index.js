import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams, Link, useHistory } from 'react-router-dom';
import { fetchCompany } from '../../store/companies';
import { deleteReview } from '../../store/reviews';
import {VscTrash} from 'react-icons/vsc';
import {BsPencilSquare} from 'react-icons/bs'
import ReactStars from 'react-rating-stars-component';
import './companyShow.css';


const CompanyShow = () => {
    const {companyId}= useParams();
    const company = useSelector(state => state.companies[companyId])
    const reviews = Object.values(useSelector(state=> state.reviews))
    const sessionUser = useSelector(state => state.session.user)
    const user = useSelector(state=>state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();
    
    useEffect(()=>{
        dispatch(fetchCompany(companyId))
    },[companyId])
    if (!sessionUser) return <Redirect to="/login" />;

    const handleDeleteReview = (e, reviewId) => {
        e.preventDefault();
        console.log(e)
        console.log(reviewId)
        dispatch(deleteReview(reviewId))

    }

    const handleUpdateReview = (e, reviewId) => {
        e.preventDefault();
        history.push(`/update-review/${reviewId}`)
    }

    const averageRating = () => {
        let sum = 0
        for (let i = 0; i < reviews.length; i++){
            let review = reviews[i];
            sum += review.rating
        }
        return sum/reviews.length
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
                            <div className='company-show-reviews'> <p>{reviews.length}</p> Reviews</div>
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
                    <div class="reviews-main-header-stars">
                        <h1>{parseFloat(averageRating()).toFixed(1)}</h1>
                        <span><ReactStars
                            count={5}
                            size={32}
                            edit={false}
                            value={parseFloat(averageRating()).toFixed(1)}
                            activeColor="#0caa41"
                            />
                        </span>
                    </div>

                </div>
                {reviews.map( review => {return(
                    <>
                        <div className='company-show-reviews-box'>

                            <div className='individual-review-container'>
                                <p className='rating-stars'>
                                    {parseFloat(review.rating).toFixed(1)} 
                                  <ReactStars
                                    count={5}
                                    size={20}
                                    edit={false}
                                    value={review.rating}
                                    activeColor="#0caa41"
                                    />
                                </p> 
                                <p className='review-current-employee'>{review.currentEmployee ? 'current employee ' : 'former employee '}
                                  for {Math.floor(Math.random()*10) + 1} years
                                </p> 
                                <p className='review-headline'>"{review.headline}"</p>
                                <p className='review-job-title'>{review.jobTitle}</p> 
                                <p className='pro-con-advice-header'>Pros</p> <p>{review.pros}</p><br />
                                <p className='pro-con-advice-header'>Cons</p> <p>{review.cons}</p>
                                <p className='pro-con-advice-header'>Advice to Management</p><p>{review.advice}</p>
                                <br />
                            </div>
                                <div class="show-button-container">
                                    {user.id === review.userId ? <button className='update-review-button' value={review.id} onClick={(e)=>handleUpdateReview(e,review.id)}><BsPencilSquare /></button>  : null}
                                    {user.id === review.userId ? <button className='delete-review-button' value={review.id} onClick={(e)=>handleDeleteReview(e,review.id)}><VscTrash values={`${review.id}`}/></button>  : null}
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