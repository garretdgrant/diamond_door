import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../store/session";

import { Link } from "react-router-dom";

const LogOut = () => {
    const dispatch = useDispatch();

    const handleClick =  (e) => {
        e.preventDefault();
        dispatch(logout())
    }
    return (
        <Link to={`/login`}><button onClick={handleClick}>Log Out</button></Link>
    )
}

export default LogOut;