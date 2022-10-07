import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useHistory } from 'react-router-dom';
import updateUser, { deleteUser } from '../../store/users'
import { MdOutlineCancel } from 'react-icons/md'
import './UpdateUserForm.css'

const UpdateUserForm = () =>{
    
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [fName, setFname] = useState("");
    const [lName, setLname] = useState("");
    const [phone,setPhone] = useState("")
    const [jobTitle, setJobTitle] = useState("");
    const [errors, setErrors] = useState(null);
    const history = useHistory();
    
    const setLocalState = ()=>{
        setEmail(user.email)
        setFname(user.fName)
        setLname(user.lName)
        setJobTitle(user.jobTitle)
        setPhone(user.phone)
    }
    useEffect(()=>{
        setLocalState()
    },[user])
  
    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.email === 'demo@user.io'){
            alert('The demo user cannot be updated, to use this feature please log out and sign up.')
            // history.push('/profile')
            return null;
        }
        const userData = {
            id: user.id,
            fName,
            lName,
            phone,
            jobTitle
          };
          dispatch(updateUser(userData)).then(res => {
                history.push('/profile')
          })
    }
  
    const handleAccountDelete = () => {
        if (user.email === 'demo@user.io'){
            alert('The demo user cannot be deleted, to use this feature please log out and sign up.')
            return null;
        }
        if (window.confirm('Are you sure you want to delete your account?')){
            dispatch(deleteUser(user.id)).then(res => {
                history.push('/signup')
            })
            history.push('/signup')
        }
    }
    
    if (!user) return null;
    return (
        <>
        <div className='update-user-page'>
            <div className='update-user-container'>
                <form onSubmit={handleSubmit} className='update-user-form'>
                <div className="update-user-inputs">
                <h1 className="update-user-header">Update your information</h1>
                {errors ? 
                    <div class="error-container">
                        <ul>
                            {errors.map(error => <li key={error}>{error}</li>)}
                        </ul>
                    </div>
                    
                    : null
                    }

                    <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email"
                    />
            
                    <input
                    type="text"
                    value={fName}
                    onChange={(e) => setFname(e.target.value)}
                    required
                    placeholder="First Name"
                    />
            
                    <input
                    type="text"
                    value={lName}
                    onChange={(e) => setLname(e.target.value)}
                    placeholder="Last Name"
                    required
                    />
            

            
                    
                    <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                    placeholder="Job Title"
                    />
                <div className='update-user-buttons'>
                    <button type="submit">Update</button>
                    <div onClick={handleAccountDelete}>Delete Account</div>
                </div>   
               
                </div>

                </form>
            </div>
              
        </div>
    </>
    )
}

export default UpdateUserForm;