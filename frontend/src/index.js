import React from 'react';
import ReactDOM from 'react-dom';
import  {Provider}  from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import configureStore from './store';
import * as session from './store/session.js'
import ScrollToTop from './components/Utils/ScrollToTop';
import csrfFetch, {restoreCSRF} from './store/csrf';
// import { fetchCompanies } from './store/companies';
// import * as interview from './store/interviews.js'
// import * as review from './store/reviews.js'
// import * as follow from './store/follows.js'

const store = configureStore();

// if (process.env.NODE_ENV !== 'production') {
  // window.store = store;
  // window.csrfFetch = csrfFetch;
  // window.restore = restoreCSRF;
  // window.session = session;
  // window.fetchCompanies = fetchCompanies;
  // window.interview = interview
  // window.review = review;
  // window.follow = follow;
// }

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <ScrollToTop />
        <App />
      </BrowserRouter>
      </Provider>
    
  );
}

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