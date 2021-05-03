import React from 'react';
import { Switch as ReactSwitch, Redirect, Route, useLocation } from 'react-router-dom';

import routes from './routes';
import { NotFound } from './pages';

const Switch = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <ReactSwitch>
      {
        routes.map((route, i) => {
          const { Page, routeOptions, pageOptions } = route;
          return (
            <Route key={`${i}${routeOptions.path}`} {...routeOptions}>
              <Page location={location} {...pageOptions} />
            </Route>
          );
        })
      }
      <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
      <Route>
        <NotFound location={location} />
      </Route>
    </ReactSwitch>
  );
};

export default Switch;