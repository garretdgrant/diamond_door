import { Link } from "react-router-dom"

const CompanyInfo = ({company}) => {
    
    if(!company) return null;
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