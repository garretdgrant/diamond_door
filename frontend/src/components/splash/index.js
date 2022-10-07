import './splash.css'
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IoDiamondSharp } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { useEffect } from 'react';
import { Icon, glassdoor } from "react-3d-icons";
import { Suspense } from 'react';



function Splash() {
  const history = useHistory();
  const loggedIn = useSelector(state => !!state.session.user);
  useEffect(()=>{

  },[])
  // if (loggedIn) history.push('/companies')
  setTimeout(() => {history.push('/login')}, 4000)
    return (
      <>
        <div className='splash-page-container'>
          <Suspense fallback={null}>
                <Icon 
                  className='splash-icon' spin={2} depth={10} lightColor={'0059FF'}
                  file={glassdoor} scale={10} color={'#0CAA41'} rotation={[360,0,0]} >
                </Icon>
          </Suspense>
        </div>

    
      </>
    );
  }
  
  export default Splash;