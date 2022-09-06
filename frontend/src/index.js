import React from 'react';
import ReactDOM from 'react-dom';
import  {Provider}  from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch, {restoreCSRF} from './store/csrf';
import * as session from './store/session.js'

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.restore = restoreCSRF;
  window.session = session;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </Provider>
    
  );
}

// ReactDOM.render(
//   <React.StrictMode>
//     <Root />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if (sessionStorage.getItem("X-CSRF-Token") === null || !sessionStorage.getItem("currentUser")) {
  restoreCSRF().then(renderApplication);
} else {
  renderApplication();
}

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null 
) {
  store.dispatch(session.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}