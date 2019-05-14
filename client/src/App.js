import React, { Fragment, useEffect } from 'react';
import UserListSection from './components/UserListSection';
import UserManagementSection from './components/UserManagementSection';

import { ReactComponent as Logo } from './static/images/affinityid-logo.svg';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser, loadView } from './actions/user';
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

    if (window.location.href.indexOf('iffinityuserid') > 1) {
      const uid = window.location.href.substring(window.location.href.indexOf('=') + 1);
      store.dispatch(loadView('View', uid));
    }
  }, []);

  return (
    <Provider store={store}>
      <Fragment>
        <div className="page-background">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <Logo />
                <div style={{ height: '50px' }} />
                <UserListSection />
              </div>
              <div className="offset-md-1 col-md-5">
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
