import React from 'react';

import { Link } from "react-router-dom";

import styles from './styles/menu.less';

const Menu = () => (
  <nav id="menu">
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
    </ul>
  </nav>
);

export default Menu;