import React from 'react';
import asyncComponent from '../../../util/asyncComponent';
import {Route, Switch } from 'react-router-dom';

const Pages = ({match}) => (
  <div className="app-wrapper">
    <Switch>
      <Route path={`${match.url}/error-404`} component={asyncComponent(() => import('./routes/404'))}/>
      <Route path={`${match.url}/error-500`} component={asyncComponent(() => import('./routes/500'))}/>
      <Route component={asyncComponent(() => import('app/routes/extraPages/routes/404'))}/>
    </Switch>
  </div>
);

export default Pages;
