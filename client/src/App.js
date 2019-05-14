import React, { Fragment, useEffect } from 'react';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserListSection from './components/UserListSection';
import UserManagementSection from './components/UserManagementSection';

import { ReactComponent as Logo } from './static/images/affinityid-logo.svg';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/user';
import { loadRole } from './actions/role';
import { loadTeam } from './actions/team';
import { loadProfileImg } from './actions/profileimg';

import './App.css';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadProfileImg());
    store.dispatch(loadRole());
    store.dispatch(loadTeam());
  }, []);

  return (
    <Provider store={store}>
      <Fragment>
        <div className="page-background">
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <Logo />
                <div style={{ height: '50px' }} />
                <UserListSection />
              </div>
              <div className="offset-md-1 col-md-6">
                <UserManagementSection />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </Provider>
  );
};

export default App;
