import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../store/session";

const LogOut = () => {
    const dispatch = useDispatch();

    const handleClick =  (e) => {
        e.preventDefault();
        dispatch(logout())
    }
    return (
        <button onClick={handleClick}>Log Out</button>
    )
}

export default LogOut;