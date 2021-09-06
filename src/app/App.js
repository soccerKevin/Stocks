import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil';

import { StyledEngineProvider } from '@material-ui/core'

import Menu from './menu'
import Switch from './switch'

import styles from './styles/app.less'
import logo from 'images/logo.jpg'

const queryClient = new QueryClient()

const App = () => (
  <Router>
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <RecoilRoot>
          <HelmetProvider>
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
          </HelmetProvider>
        </RecoilRoot>
      </StyledEngineProvider>
    </QueryClientProvider>
  </Router>
)

export default App
