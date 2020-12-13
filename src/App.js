import React from 'react';
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import history from './utils/browserHistory';
import { Success, Verification, PageNotFound } from './pages';
import { SuccessRoute, VerificationRoute, BaseRoute } from './routes';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path={BaseRoute} component={Verification} />
          <Route exact path={VerificationRoute} component={Verification} />
          <Route exact path={SuccessRoute} component={Success} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
