import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';
import { fetchCompany } from '../../store/companies';
import { createReview } from '../../store/reviews';
import ReactStars from "react-rating-stars-component";


import './AddReviewForm.css'

const AddReviewForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {companyId} = useParams();
    const company = useSelector(state => state.companies[companyId])
    const user = useSelector(state=>state.session.user)
    const [rating, setRating] = useState(null)
    const [currentEmployee, setCurrentEmployee] = useState(null)
    const [formerEmployee, setFormerEmployee] = useState(null)
    const [employmentStatus, setEmploymentStatus] = useState('Full-Time')
    const [jobTitle, setJobTitle] = useState('')
    const [headline, setHeadline] = useState('')
    const [pros, setPros]= useState('')
    const [cons, setCons] = useState('')
    const[advice, setAdvice] = useState('')
    const [errors, setErrors] = useState(null)
    useEffect(()=>{
        dispatch(fetchCompany(companyId)) 
    },[companyId])

    const handleCurrentEmployee = (e) =>{
        switch (e.target.id){
            case 'current-employee':
                setCurrentEmployee(true);
                setFormerEmployee(false);
                break;
            case 'former-employee':
                setCurrentEmployee(false);
                setFormerEmployee(true);
                break;
        }
    }

    const handleEmployeeStatus = (e) =>{
        setEmploymentStatus(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const review = {
            companyId,
            userId: user.id,
            rating,
            currentEmployee,
            formerEmployee,
            employmentStatus,
            jobTitle,
            headline,
            pros,
            cons,
            advice

        }
        dispatch(createReview(review))
            .then(()=> history.push(`/companies/${companyId}`))
            .catch( async (res) => {
                let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); 
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);

            })
    }

    const handleRating = rating => {
        setRating(rating)
    }

 
    const handleJobTitle = e => {
        setJobTitle(e.target.value)
    }

    const handleTextAreaInputs = e => {
        switch (e.target.id){
            case 'add-form-pros':
                setPros(e.target.value)
                break;
            case 'add-form-cons':
                setCons(e.target.value)
                break;
            case 'add-form-advice':
                setAdvice(e.target.value)
                break;
            default:
                break;

        }
    
    }

    const handleHeadline = e => {
        setHeadline(e.target.value)
    }
    if(!company) return null;
    return (
        <>
            <div className='add-form-outter-container'>
                <div className='add-form-box-container'>
                    <div className='add-form-form-container'>
                        <h1 className='add-form-header'>Review {company.name}</h1>
                        <p className='add-form-minute'>It only takes a minute! Your anonymous review will help other job seekers</p>
                        <img className='add-form-logo' src={`${company.photoUrl}`} /> <br />

                        <form className='add-form' onSubmit={handleSubmit}>
                            <div class="overall-rating">
                                <p>Overall Rating</p>
                                <ReactStars  size={40} count={5} onChange={handleRating} activeColor={`#0caa41`}/>
                            </div>
                            {/* <label > {rating}
                                <input type='range' min='1' max='5' onClick={handleRating} />
                            </label> <br /> */}

                                <label className='current-employee-label'>Are you a current or former employee? </label>
                                 <div class="employee-radios-container">
                                    <div class="current-employee-input-container">
                                     <label for='current-employee'>
                                        <input id='current-employee' type="radio" name='employee' onChange={handleCurrentEmployee}  />
                                        Current Employee
                                    </label> 
                                    </div>
                                    <div className='former-employee-input-container'>
                                    <label for="former-employee">
                                        <input id='former-employee' type="radio" name='employee' onChange={handleCurrentEmployee} />
                                        Former Employee
                                    </label> 
                                    </div>
                                 </div>
                                 <br />
                            
                            <div class="add-form-status-container">
                                <label> Employment Status</label> <br/><br />
                                    <select className='add-form-drop' onChange={handleEmployeeStatus} >
                                        <option value="Full-Time">Full Time</option>
                                        <option value="Part-Time">Part Time</option>
                                        <option value="Intern">Intern</option>
                                    </select>
                                 <br />
                            </div>
                            
                            <div className='add-form-job-title-container'>
                                <label>Your Job Title at {`${company.name}`}</label><br />
                                <input type="text" value={jobTitle} onChange={handleJobTitle} />    
                                <br />
                            </div>
                            
                            <div class="add-form-headline-container">
                                <label>Review Headline</label> <br />
                                <input type="text" value={headline} onChange={handleHeadline} />
                                <br />
                            </div>
                            
                            <div class="add-form-pros-container">
                                <label>Pros: </label> <br />
                                <textarea value={pros} maxLength='200' cols="30" rows="5" id='add-form-pros' 
                                onChange={handleTextAreaInputs} 
                                placeholder={`Share some of the best reasons to work at ${company.name}`}>

                                </textarea>
                                <br />
                            </div>
                            
                            <div class="add-form-cons-container">
                                <label>Cons: </label> <br />
                                <textarea maxLength='200' cols="30" rows="5" id='add-form-cons' 
                                placeholder={`Share some of the downsides to work at ${company.name}`}
                                value={cons} onChange={handleTextAreaInputs} />
                                <br />
                            </div>
                            
                            <div class="add-form-advice">
                                <label>Advice to Management: </label> <br />
                                    <textarea maxLength='200' cols="30" rows="5" id='add-form-advice' 
                                       placeholder={`Share suggestions for how management can improve working at ${company.name}`} 
                                       value={advice} onChange={handleTextAreaInputs}/>
                                <br />
                            </div>
                            
                            {errors ? 
                                <div class="error-container">
                                    {errors ? errors.map((error, i) => {
                                    return( <li key={i}>{error}</li> )
                                        }) : null}
                                </div>
                            :null}
                           
                            <div class="add-form-button-container"><button>Submit Review</button></div>
                        </form>
                    </div>
                    <div className='add-form-rules-container'>
                        <h1 className='rules-header'>Keep it Real</h1>
                        <p className='add-form-thanks'>
                            Thank you for contributing to the community. Your opinion will 
                            help others make decisions about jobs and companies.
                        </p>
                        <p className='add-form-guidelines'> 
                            Please stick to the Community Guidelines and do not post:
                        </p>
                        <ul className='add-form-rules'>
                            <li>Aggressive or discriminatory language</li>
                            <li>Profanities</li>
                            <li>Trade secrets/confidential information</li>
                        </ul>

                        <p className='add-form-rules-ending'>
                            Thank you for doing your part to keep Glassdoor the most trusted 
                            place to find a job and company you love. See the Community Guidelines 
                            for more details.
                        </p>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AddReviewForm;
