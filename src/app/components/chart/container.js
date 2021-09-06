import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './style/container.less'

const Container = ({ children, direction, className }) => (
  <div className={classNames(['chartContainer', direction, className])}>
    {children}
  </div>
)

Container.propTypes = {
  direction: PropTypes.oneOf(['column', 'row']),
  className: PropTypes.string,
}

Container.defaultProps = {
  direction: 'column',
}

export default Container
