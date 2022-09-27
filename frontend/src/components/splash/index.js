import './splash.css'
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';


function Splash() {
  const history = useHistory();
  const loggedIn = useSelector(state => !!state.session.user);
  if (loggedIn) {
    history.push('/events')
  }
  if (loggedIn) history.push('/companies')
  setTimeout(() => {history.push('/login')}, 3500)
    return (
      <div className='splash-page-container'>

        <img className="splash-page-here" src="/here.svg" alt="here" onClick={() => {history.push(`/login`)}} />
        <div className="splash-pin-flexer">
          <img className="splash-page-pin" src="/pin.svg" alt="pin" onClick={() => {history.push(`/login`)}} />
          <div className="pin-shadow"></div>
          </div>
        <img className="splash-page-now" src="/now.svg" alt="now" onClick={() => {history.push(`/login`)}} />
        {/* <img src="/logo.svg" alt="logo" className="splash-page-logo" onClick={() => {history.push(`/login`)}} /> */}
      </div> 
    );
  }
  
  export default Splash;