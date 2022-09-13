import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { logout } from "../../store/session";

import { Link } from "react-router-dom";

const LogOut = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick =  (e) => {
        e.preventDefault();
        dispatch(logout()).then(()=> history.push(`/login`))
    }
    return (
        <Link to={`/login`}><button onClick={handleClick}>Log Out</button></Link>
    )
}

export default LogOut;