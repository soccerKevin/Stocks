import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './style/container.less'

const Container = ({ children, direction }) => (
  <div className={classNames(['chartContainer', direction])}>
    {children}
  </div>
)

Container.PropTypes = {
  direction: PropTypes.oneOf(['column', 'row']),
}

Container.defaultProps = {
  direction: 'column',
}

export default Container
