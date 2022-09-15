import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom"

const CompanyInfo = ({company}) => {
    

    return(
       
        <Link  to={`/companies/${company.id}`}>
            <div className={`${company.name}-container`} >
                <img src={company.photoUrl}  />
                <li key={company.id} >{company.name}</li>
                <p className="">{company.about}</p>
            </div>
     </Link>
    )
}

export default CompanyInfo;