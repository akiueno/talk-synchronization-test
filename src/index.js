import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { TopMainPage, Line, SignUp, SignInOrUp, Profile } from './pages';

import * as serviceWorker from './serviceWorker';
import {configureStore} from './redux';

import './index.css';

import Auth from './Auth';

const store = configureStore();

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/signin" component={SignInOrUp} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/profile" component={Profile} />
          {/* 以下認証のみ */}
          <Auth>
            <Route exact path="/" component={TopMainPage} />
            <Route exact path="/line" component={Line} />
          </Auth>
        </Switch>
      </Router>
    </Provider>,
    document.getElementById('root')
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
