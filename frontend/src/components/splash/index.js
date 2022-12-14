import './splash.css'
import {  useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {  Suspense } from 'react';
import { Icon, glassdoor } from "react-3d-icons";




function Splash() {
  const history = useHistory();
  const loggedIn = useSelector(state => !!state.session.user);

  if (loggedIn) history.push('/companies')
  setTimeout(() => {history.push('/login')}, 4000)
    return (
      <>
        <div className='splash-page-container'>
          <Suspense fallback={null}>
                <Icon 
                  className='splash-icon' spin={2} depth={10} lightColor={'#fff'}
                  file={glassdoor} scale={10} color={'#0CAA41'} rotation={[360,0,0]} >
                </Icon>
          </Suspense>
        </div>
      </>
    );
  }
  
  export default Splash;