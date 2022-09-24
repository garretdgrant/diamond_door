import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams, Link, useHistory } from 'react-router-dom';
import { fetchCompany } from '../../store/companies';
import ReactStars from 'react-rating-stars-component';
import ReviewShow from '../ReviewShow';
import InterviewShow from '../InterviewShow';
import { createFollow, deleteFollow, fetchFollows } from '../../store/follows';


const CompanyShow = () => {
    const {companyId}= useParams();
    const company = useSelector(state => state.companies[companyId])
    const reviews = Object.values(useSelector(state=> state.reviews))
    const interviews = Object.values(useSelector(state=> state.interviews))
    const sessionUser = useSelector(state => state.session.user)
    const follows = Object.values(useSelector(state => state.follows))
    const dispatch = useDispatch();
    const [show,setShow] = useState(true);
    const [avg, setAvg] = useState();
    const [isFollowed, setIsFollowed] = useState(false)
    const [followId,setFollowId] = useState(null);
    
    const averageRating = () => {
        let sum = 0
        for (let i = 0; i < reviews.length; i++){
            let review = reviews[i];
            sum += review.rating
        }
        return sum/reviews.length
    }
    useEffect(()=>{
        dispatch(fetchCompany(companyId))
        dispatch(fetchFollows(sessionUser.id))
        setAvg(averageRating())
        if (follows && company) follows.forEach(follow => {
            if (follow.companyId === company.id){
                setIsFollowed(true)
                setFollowId(follow.id)
            } 
        })
    },[companyId, follows.length])
    
    
    

    useEffect(()=>{
       setAvg(averageRating())
       const spans = document.querySelectorAll('.stars *')
       if (spans){
        spans.forEach((span, index)=>{

            if(index < Math.round(averageRating())) span.style.color = '#0caa41';
            else span.style.color = 'grey';
        })
       }
    },[reviews])

    const handleFollow = (e,companyId) =>{
        e.preventDefault();
        if (!isFollowed){
            dispatch(createFollow({
                userId: sessionUser.id,
                companyId,
                isFollowing: true
            }))
        } else {
            dispatch(deleteFollow(followId))
            setIsFollowed(false);
            setFollowId(null);
        }
    }

    if (!sessionUser) return <Redirect to="/login" />;
    const handleShow = (bool) => {
        setShow(bool);
        
        const rev = document.querySelector('.company-show-reviews');
        const int = document.querySelector('.company-show-jobs');
        if (!bool){
            int.style.borderBottom = 'solid #0caa41'; 
            rev.style.border = 'none';
        } else {
            int.style.borderBottom = null;
            rev.style.border = null;
        } 
        

    }
    if (!company || !reviews) return (<>No company or Reviews</>);

         return (
        <>
            <div className='company-show-center'>
                <div className='company-show-outter-container'>
                    <div className='company-show-container'>
                        <div className='company-show-nav'>
                            <div className='company-show-banner'><img src="../banner.png" alt="" /></div>
                            <div className='company-show-logo'><img src={`${company.photoUrl}`} alt="" /></div>
                            <div className='company-show-name'><h1 > {company.name}</h1></div>
                            <div className='company-show-bottom-menu'>
                                <div className='company-show-menu-left'>
                                    <div className='company-show-reviews' onClick={(e)=> handleShow(true)}> <p>{reviews.length}</p> Reviews</div>
                                    <span className='company-show-break'></span>
                                    <div className='company-show-jobs' onClick={(e)=> handleShow(false)}> <p>{interviews.length}</p> Interviews</div>
                                </div>
                                <div className='company-show-menu-right'>
                                    <div className='company-show-follow' onClick={(e)=>handleFollow(e,company.id)}>
                                       {isFollowed ? "Unfollow ": "Follow"}
                                        
                                    </div>
                                    <Link className='company-show-add-review' 
                                    to={ show ? `/add-review/${company.id}` : `/add-interview/${company.id}`} >
                                        <div className='company-show-add-review-div'> 
                                            <span className='company-review-plus'>+</span>
                                            <p className='add-review-text'>
                                                {show ? "Add Review " : "Add Interview"}</p> 
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
                        {show ? 
                        <div className='company-attached'>
                            <h1 className='company-overview-header'>{company.name} Reviews</h1>
                            <div className="reviews-main-header-stars">
                                {avg ? 
                                    <h1>{parseFloat(avg).toFixed(1)}</h1>
                                : <h1>N/A</h1> }
                                <span><ReactStars
                                    classNames={'stars'}
                                    count={5}
                                    size={32}
                                    edit={false}
                                    value={avg}
                                    activeColor="#0caa41"
                                    />
                                </span>
                            </div>   
                        </div>  :   <div className='company-attached'>
                            <h1 className='company-overview-header'>{company.name} Interview Questions</h1> 
                        </div> }

                        {show ?  reviews.map( review => {return(<ReviewShow companyName={company.name} review={review} key={review.id}/>)}) : 
                        interviews.map((interview, index) => {return <InterviewShow companyName={company.name} interview={interview} key={interview.id} index={index} user={sessionUser}/> })}
                    
                    </div>
                </div>
            </div>
        </>
    )
    
   
}

export default CompanyShow;