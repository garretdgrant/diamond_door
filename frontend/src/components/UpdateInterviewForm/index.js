import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import '../AddInterviewForm/AddInterviewForm.css'
import {FiThumbsUp, FiThumbsDown} from 'react-icons/fi'
import {AiOutlineMinus} from 'react-icons/ai'
import { useEffect, useState } from 'react';
import { createInterview, fetchInterview } from '../../store/interviews';
import { fetchCompany } from '../../store/companies';
import {HiInformationCircle} from 'react-icons/hi'

const UpdateInterviewForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {interviewId, companyId} = useParams();
    const user = useSelector(state => state.session.user)
    const interviewData = useSelector(state=>state.interviews[interviewId])
    const company = useSelector(state=>state.companies[companyId])
    const [experience, setExperience] = useState(null);
    const [title, setTitle] = useState(null);
    const [process, setProcess] = useState(null);
    const [difficulty, setDifficulty] = useState('Easy');
    const [offer, setOffer] = useState('No');
    const [questions, setQuestions] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [errors, setErrors] = useState(null);
    

    useEffect(()=>{
        dispatch(fetchInterview(interviewId))
    },[interviewId])

    useEffect(()=>{
        dispatch(fetchCompany(companyId))
    },[companyId])

   const setLocalStates = () => {
        let interview = interviewData;
        setExperience(interview.experience);
        setTitle(interview.title);
        setProcess(interview.process);
        setDifficulty(interview.difficulty);
        setOffer(interview.offer);
        setQuestions(interview.questions);
        setAnswer(interview.answer);
     }

    useEffect(()=>{if(interviewData) setLocalStates()},[interviewData]);

    if (!user) return <Redirect to="/login" />;
    if(!interviewData) <Redirect to='/' />

    
  


    const handleExp =(experience) => {
        let icon1 = document.querySelector('#positive');
        let icon2 = document.querySelector('#neutral');
        let icon3 = document.querySelector('#negative')
        let text = document.querySelector('.interview-exp-text')
     
        console.log(text)
       switch(experience){
        case 'positive':
            icon1.style.backgroundColor = '#0caa41'
            icon1.style.color = '#ffffff'
            icon2.style.color = null
            icon3.style.color = null
            icon2.style.backgroundColor = null
            icon3.style.backgroundColor = null
            text.innerText = 'Positive'
            setExperience('positive')
            break;
        case 'neutral':
            icon2.style.backgroundColor = '#f5c131'
            icon2.style.color = '#ffffff'
            icon1.style.color = null
            icon3.style.color = null
            icon1.style.backgroundColor = null
            icon3.style.backgroundColor = null
            text.innerText = 'Neutral'
            setExperience('neutral')
            break;
        case 'negative':
            icon3.style.backgroundColor = '#d93e30'
            icon3.style.color = '#ffffff'
            icon2.style.color = null
            icon1.style.color = null
            icon2.style.backgroundColor = null
            icon1.style.backgroundColor = null
            text.innerText = 'Negative'
            setExperience('negative')
            break;
       }
    }

    const handleSubmbit = e => {
        e.preventDefault()
        const payload = {
            experience,
            userId: user.id,
            companyId,
            title,
            process,
            difficulty,
            offer,
            questions,
            answer
        }
        dispatch(createInterview(payload)).then(
            ()=> history.push(`/companies/${company.id}`)
        )
        .catch( async (res) => {
            let data;
            try {
            data = await res.clone().json();
            } catch {
            data = await res.text(); 
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
        })
    }

    if (!company || !interviewData) return(<></>)
    return(
        <>
            <div className='interview-outter-container'>
                <div className='interview-form-container'>
                    <h1 className='interview-header'>Update your job interview</h1>
                    <div className='interview-guidlines-box'>
                        <div className='interview-info-icon'>
                            <HiInformationCircle />
                        </div>
                        <p> Please stick to the Community Guidelines.
                            We review and approve every submission against our Community Guidelines 
                            before it is published to the site.
                        </p>
                    </div>
                    <div className='interview-employer-container'>
                        <p className='interview-employer-label'>Employer *</p>
                        <p className='interview-employer-name'>{company.name}</p>
                    </div>

                <form className='interview-form' onSubmit={handleSubmbit}>
                    <div className='interview-exp-container'>
                        <p className='interview-exp-label'>Rate Overall Experience *</p>
                        <div className='exp-icon-container'>
                            <div className='interview-icon-container' id='positive' onClick={()=>handleExp('positive')}>
                                <FiThumbsUp />
                            </div>
                            <div className='interview-icon-container' id='neutral' onClick={()=>handleExp('neutral')}>
                                <AiOutlineMinus />
                            </div>
                            <div className='interview-icon-container' id='negative' onClick={()=>handleExp('negative')}>
                                <FiThumbsDown />
                            </div>
                        </div>
                        <div className='interview-exp-text'></div>
                    </div>

                    <div className='interview-title-container'>
                        <label htmlFor='title' className='interview-title-label'>Job Title *</label>
                        <input value={title} type="text"  id="title" onChange={(e)=> setTitle(e.target.value)} 
                        className='interview-title-input' />
                    </div>

                    <div className='interview-process-container'>
                        <label htmlFor='process' className='interview-title-label'>Describe the Interview Process *</label><br/>
                        <textarea id="process" cols="30" rows="7" value={process} onChange={(e) => setProcess(e.target.value) } />
                    </div>

                    <div className='interview-difficulty-container'>
                        <label for="difficulty">Interview Difficulty</label>
                        <select value={difficulty}  id="difficulty" onChange={(e)=>setDifficulty(e.target.value)}>
                            <option value="Easy">Easy</option>
                            <option value="Average">Average</option>
                            <option value="Difficult">Difficult</option>
                        </select>
                    </div>

                    <div className='interview-offer-container'>
                        <label for="offer">Did you get an offer?</label>
                        <select  id="offer" value={offer} onChange={e=>setOffer(e.target.value)}>
                            <option value="No">No</option>
                            <option value="Declined">Yes, but I declined</option>
                            <option value="Accepted">Yes, and I accepted</option>
                        </select>
                    </div>

                    <div className='interview-questions-container'>
                        <label htmlFor='questions' className='interview-questions-label'>Interview Questions *</label><br/>
                        <textarea placeholder='Q: What was the one thing that they asked you?' 
                           value={questions} onChange={e=>setQuestions(e.target.value)} id="process" cols="30" rows="10"></textarea>
                    </div>

                    <div className='answer-questions-container'>
                        
                        <textarea placeholder='How did you answer this question?(Optional)' 
                           value={answer} onChange={e=>setAnswer(e.target.value)} id="answer" cols="30" rows="10"></textarea>
                    </div>

                    {errors ? 
                        <div class="error-container">
                            {errors ? errors.map((error, i) => {
                                return( <li key={i}>{error}</li> )
                                }) 
                            : null}
                        </div>
                    :null}

                   <div class="interview-button-container"><button id='interview-button'>Submit</button></div> 

                </form>

                </div>
            </div>
        </>
    )
}

export default UpdateInterviewForm;