import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Menu from './menu';
import Switch from './switch';

import styles from './styles/app.less';

const App = () => (
  <Router>
    <Menu />
    <div id="mainContainer">
      <Switch />
    </div>
  </Router>
);

export default App;