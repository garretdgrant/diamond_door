import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './splash.css'
const Splash = () => {
    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser || Object.keys(sessionUser).length === 0) return <Redirect to="/login" />;
    return (

        <div className="splash-header"><h1>Splash Page</h1></div>
    )
}

export default Splash