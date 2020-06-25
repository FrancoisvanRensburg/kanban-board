import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Project from '../routes/Project';

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path='/project/:projectId' component={Project} />
      </Switch>
    </>
  );
};

export default Routes;
