import './InterviewShow.css'
import {BsPencilSquare} from 'react-icons/bs'
import {VscTrash} from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { deleteInterview } from '../../store/interviews';
import { useHistory } from 'react-router-dom';
import {BsCheck, BsDash, BsX} from 'react-icons/bs'


const InterviewShow = ({interview, user, index, companyName}) => {
    const createdAt = new Date(interview.createdAt)
    const date = createdAt.toLocaleDateString();
    const dispatch = useDispatch();
    const history = useHistory();
    const id = String.fromCharCode(index + 97)



    const handleInterviewUpdate = () =>{
        history.push(`/update-interview/${interview.id}/${interview.companyId}`)
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    const handleInterviewDelete = () =>{
       if(window.confirm(`Are you sure you want to delete interview for ${companyName}`)) dispatch(deleteInterview(interview.id))
    }


    return(
        <>
            <div className='company-show-reviews-box'>
                <div class="individual-review-container">
                    <div className='interview-date-container'>
                       <p>{date}</p> 
                    </div>
                    <div className='interview-title'>{interview.title} Interview</div>
                    <div class="anonymous">Anonymous Interview Candidate</div>
                    <div className="interview-icons-container">
                        <div class="interview-offer-container">
                            {interview.offer === 'Accepted' ? 
                                <div id={`${id}Accepted`} className={`interview-check`}><BsCheck /></div>
                            : null}

                            {interview.offer === 'Declined' ? 
                                <div id={`${id}Declined`} className={`interview-minus`}><BsDash /></div>
                            : null}

                            {interview.offer === 'No' ? 
                                <div id={`${id}No`} className={`interview-x`}><BsX /></div>
                            :null}
                            <div className='icon-text'>{interview.offer} Offer</div>
                        </div>

                        <div class="interview-experience-container">
                            {interview.experience === 'positive' ? 
                                <div id={`${id}Positive`} className={`interview-check`}><BsCheck /></div>
                            : null}

                            {interview.experience === 'neutral' ? 
                                <div id={`${id}Neutral`} className={`interview-minus`}><BsDash /></div>
                            : null}

                            {interview.experience === 'negative' ? 
                                <div id={`${id}Negative`} className={`interview-x`}><BsX /></div>
                            : null}
                            <div className='icon-text'>{capitalizeFirstLetter(interview.experience)} Experience</div>
                        </div>

                        <div class="interview-difficulty-container">
                            {interview.difficulty === 'Easy' ? 
                                <div id={`${id}Positive`} className={`interview-check`}><BsCheck /></div>
                            : null}

                            {interview.difficulty === 'Average' ? 
                                <div id={`${id}Neutral`} className={`interview-minus`}><BsDash /></div>
                            : null}

                            {interview.difficulty === 'Difficult' ? 
                                <div id={`${id}Negative`} className={`interview-x`}><BsX /></div>
                            : null}
                            <div className='icon-text'>{interview.difficulty} Interview</div>  
                        </div>


                    </div>
                    
                    <div class="interview-process-container">
                        <div class="interview-process-title">Interview</div>
                        <div>{interview.process}</div>
                    </div>

                    <div class="interview-questions-container">
                        <div class="interview-process-title">Interview Questions</div>
                        <div>{interview.questions}</div>
                    </div>

                    <div>{interview.answer}</div>

                    <div className="show-button-container">
                        {user.id === interview.userId ? <button className='update-review-button' value={interview.id} 
                        onClick={handleInterviewUpdate}><BsPencilSquare /></button>  : null}
                        {user.id === interview.userId ? <button className='delete-review-button' value={interview.id} 
                            onClick={handleInterviewDelete}><VscTrash /></button>  : null}
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