import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './AddReviewForm.css'

const AddReviewForm = () => {
    const {companyId} = useParams();
    const company = useSelector(state => state.companies[companyId])

    return (
        <>
            <h1>Add Review Form for {company.name}</h1>
        </>
    )
}

export default AddReviewForm;
