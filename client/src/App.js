import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import Projects from './routes/Landing';
import ProjectDub from './routes/Project/dragndrop';

import Routes from './app/Routes';
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Projects} />
          <Route exact path='/dub' component={ProjectDub} />
          <Routes />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
