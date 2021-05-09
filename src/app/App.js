import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import Menu from './menu'
import Switch from './switch'

import styles from './styles/app.less'
import logo from 'images/logo.jpg'

const queryClient = new QueryClient()

const App = () => (
  <Router>
    <QueryClientProvider client={queryClient}>
      <div id='header'>
        <Link to='/'>
          <img src={logo} id='logo' />
        </Link>
        <Menu />
      </div>
      <div id="mainContainer">
        <Switch />
      </div>
    </QueryClientProvider>
  </Router>
)

export default App