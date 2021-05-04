import React from 'react'

import { NavLink } from 'react-router-dom'

import styles from './styles/menu.less'

const paths = [
  {
    label: 'My Charts',
    to: '/myCharts',
  },
]

const Menu = () => {
  return (
    <nav id="menu">
      <ul>
        {
          paths.map((path, i) => {
            const { to, label } = path

            return (
              <li key={`${i}_${path}`}>
                <NavLink activeClassName="active" to={to}>{label}</NavLink>
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
}

export default Menu