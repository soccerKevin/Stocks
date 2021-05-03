import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import Menu from './menu';
import Switch from './switch';

import styles from './styles/app.less';
import logo from 'images/logo.jpg';

const App = () => (
  <Router>
    <div id='header'>
      <Link to='/'>
        <img src={logo} id='logo' />
      </Link>
      <Menu />
    </div>
    <div id="mainContainer">
      <Switch />
    </div>
  </Router>
);

export default App;