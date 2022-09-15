import '../companyShow/companyShow.css'
import ReactStars from 'react-rating-stars-component'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {BsPencilSquare} from 'react-icons/bs'
import {VscTrash} from 'react-icons/vsc';
import { deleteReview } from '../../store/reviews'



const ReviewShow = ({review, companyName}) => {
    const user =  useSelector(state=>state.session.user)
    const history = useHistory();
    const dispatch = useDispatch();

    const handleDeleteReview = (e, reviewId) => {
        e.preventDefault();
      if (window.confirm(`Are you sure you want to delete your review for ${companyName}`))
        dispatch(deleteReview(reviewId))

    }
    
    const handleUpdateReview = (e, reviewId) => {
        e.preventDefault();
        history.push(`/update-review/${reviewId}/${review.companyId}`)
    }

    return(
        <>
                        <div className='company-show-reviews-box'>

                            <div className='individual-review-container'>
                                <span className='rating-stars'>
                                    {parseFloat(review.rating).toFixed(1)} 
                                  <ReactStars
                                    count={5}
                                    size={20}
                                    edit={false}
                                    value={review.rating}
                                    activeColor="#0caa41"
                                    />
                                </span> 
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
                                <div className="show-button-container">
                                    {user.id === review.userId ? <button className='update-review-button' value={review.id} onClick={(e)=>handleUpdateReview(e,review.id)}><BsPencilSquare /></button>  : null}
                                    {user.id === review.userId ? <button className='delete-review-button' value={review.id} onClick={(e)=>handleDeleteReview(e,review.id)}><VscTrash values={`${review.id}`}/></button>  : null}
                                </div>
                        </div>
                    </>
    )

}

export default ReviewShow;