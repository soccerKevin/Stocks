import React from 'react'

import styles from './styles/notFound.less'

const NotFound = ({ location: { pathname } }) => (

  <div id='notFound'>
    <h1>404</h1>
    <p>{pathname} is just a painting</p>
    <img src="https://i.gifer.com/2fEt.gif" alt="Fake Door" style={{ maxWidth: '500px' }} />
  </div>
)

export default NotFound