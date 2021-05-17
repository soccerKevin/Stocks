import React from 'react'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider'

import Menu from './menu'
import Switch from './switch'

import styles from './styles/app.less'
import logo from 'images/logo.jpg'

const queryClient = new QueryClient()

const App = () => (
  <Router>
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Stocks</title>
        </Helmet>
        <div id='header'>
          <Link to='/'>
            <img src={logo} id='logo' />
          </Link>
          <Menu />
        </div>
        <div id='mainContainer'>
          <Switch />
        </div>
      </StyledEngineProvider>
    </QueryClientProvider>
  </Router>
)

export default App
