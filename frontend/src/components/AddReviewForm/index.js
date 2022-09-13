import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';
import { fetchCompany } from '../../store/companies';
import { createReview } from '../../store/reviews';
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";

import './AddReviewForm.css'

const AddReviewForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {companyId} = useParams();
    const company = useSelector(state => state.companies[companyId])
    const user = useSelector(state=>state.session.user)
    const [rating, setRating] = useState(5)
    const [currentEmployee, setCurrentEmployee] = useState(false)
    const [formerEmployee, setFormerEmployee] = useState(false)
    const [employmentStatus, setEmploymentStatus] = useState('Full-Time')
    const [jobTitle, setJobTitle] = useState('')
    const [headline, setHeadline] = useState('')
    const [pros, setPros]= useState('')
    const [cons, setCons] = useState('')
    const[advice, setAdvice] = useState('')
    useEffect(()=>{
        dispatch(fetchCompany(companyId)) 
    },[companyId])

    const handleCurrentEmployee = (e) =>{
        console.log(e.target)
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
        console.log(currentEmployee, formerEmployee)
    }

    const handleEmployeeStatus = (e) =>{
        setEmploymentStatus(e.target.value)
        console.log('Employment Status',employmentStatus)
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
        dispatch(createReview(review)).then(()=> history.push(`/companies/${companyId}`))
    }

    const handleRating = rating => {
        setRating(rating)
        console.log('Rating', rating)
    }

    // const handleCurrentEmployee = e => {
    //     console.log('Im in current employee change')
    //     setCurrentEmployee(!currentEmployee)
    //     setFormerEmployee(!currentEmployee)
    //     console.log(currentEmployee , formerEmployee)
    // }

    const handleJobTitle = e => {
        setJobTitle(e.target.value)
        console.log(jobTitle)
    }

    const handleTextAreaInputs = e => {
        switch (e.target.id){
            case 'add-form-pros':
                setPros(e.target.value)
                console.log(pros)
                break;
            case 'add-form-cons':
                setCons(e.target.value)
                console.log(cons)
                break;
            case 'add-form-advice':
                setAdvice(e.target.value)
                console.log(advice)
                break;
            default:
                break;

        }
    
    }

    const handleHeadline = e => {
        setHeadline(e.target.value)
    }

    return (
        <>
            <h1>Review {company.name}</h1>
            <p>It only takes a minute! Your anonymous review will help other job seekers</p>
            <img src={`${company.photoUrl}`} /> <br />

            <form onSubmit={handleSubmit}>
                <ReactStars size={24} count={5} onChange={handleRating} activeColor={`#0caa41`}/>
                {/* <label > {rating}
                    <input type='range' min='1' max='5' onClick={handleRating} />
                </label> <br /> */}

                    <label>Former or Current Employee? 
                    <input id='current-employee' type="radio" name='employee' onChange={handleCurrentEmployee}  />
                    Current 
                    <input id='former-employee' type="radio" name='employee' onChange={handleCurrentEmployee} />
                    Former
                    </label> <br />
                

                <label> Employment Status
                    <select onChange={handleEmployeeStatus} >
                        <option value="Full-Time">Full Time</option>
                        <option value="Part-Time">Part Time</option>
                        <option value="Intern">Intern</option>
                    </select>
                </label> <br />

                <label>Job Title
                    <input type="text" value={jobTitle} onChange={handleJobTitle} />    
                </label> <br />

                <label>Review Headline
                    <input type="text" value={headline} onChange={handleHeadline} />
                </label> <br />

                <label>Pros: 
                    <textarea value={pros} maxLength='200' cols="30" rows="5" id='add-form-pros' onChange={handleTextAreaInputs}>

                    </textarea>
                </label> <br />

                <label>Cons: 
                    <textarea maxLength='200' cols="30" rows="5" id='add-form-cons' value={cons} onChange={handleTextAreaInputs} />
                </label> <br />

                <label>Advice to Management: 
                    <textarea maxLength='200' cols="30" rows="5" id='add-form-advice' value={advice} onChange={handleTextAreaInputs}/>
                </label> <br />

                <button>Submit</button>


            </form>

            {console.log('status from form: ', 'Former: ', formerEmployee, 'Current: ',currentEmployee)}
        </>
    )
}

export default AddReviewForm;
