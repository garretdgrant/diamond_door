import './InterviewShow.css'
import {BsPencilSquare} from 'react-icons/bs'
import {VscTrash} from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { deleteInterview } from '../../store/interviews';
import { Redirect, useHistory } from 'react-router-dom';

const InterviewShow = ({interview, user}) => {
    const createdAt = new Date(interview.createdAt)
    const date = createdAt.toLocaleDateString();
    const dispatch = useDispatch();
    const history = useHistory()
    const handleInterviewUpdate = () =>{
        history.push(`/update-interview/${interview.id}/${interview.companyId}`)
    }

    return(
        <>
            <div className='company-show-reviews-box'>
                <div class="individual-review-container">
                    <div>{date}</div>
                    <div>{interview.title}</div>
                    <div>{interview.offer}</div>
                    <div>{interview.experience}</div>
                    <div>{interview.difficulty}</div>
                    <div>{interview.process}</div>
                    <div>{interview.questions}</div>
                    <div>{interview.answer}</div>

                    <div className="show-button-container">
                        {user.id === interview.userId ? <button className='update-review-button' value={interview.id} 
                        onClick={handleInterviewUpdate}><BsPencilSquare /></button>  : null}
                        {user.id === interview.userId ? <button className='delete-review-button' value={interview.id} 
                            onClick={()=>{dispatch(deleteInterview(interview.id))}}><VscTrash /></button>  : null}
                    </div>
                </div>
            </div>

{/* <div className='individual-review-container'>
    
   
</div>
    <div className="show-button-container">
        {user.id === review.userId ? <button className='update-review-button' value={review.id} onClick={(e)=>handleUpdateReview(e,review.id)}><BsPencilSquare /></button>  : null}
        {user.id === review.userId ? <button className='delete-review-button' value={review.id} onClick={(e)=>handleDeleteReview(e,review.id)}><VscTrash values={`${review.id}`}/></button>  : null}
    </div>
</div> */}

        </>

        
    )
}

export default InterviewShow;