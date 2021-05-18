import React from 'react'
import PropTypes from 'prop-types'

import { Autocomplete, TextField } from '@material-ui/core'

import { INTERVALS } from 'conf/intervals'

import './style/intervalSelect.less'

const renderInput = (params) => (
  <TextField
    {...params}
    label='Interval'
    variant='standard'
    inputProps={{...params.inputProps}}
  />
)

const IntervalSelect = ({ ...rest }) => (
  <Autocomplete
    options={INTERVALS}
    renderInput={renderInput}
    autoHighlight
    autoComplete
    disableClearable
    className='intervalSelect'
    {...rest}
  />
)

IntervalSelect.propTypes = {
  options: PropTypes.shape({
    defaultValue: PropTypes.string,
    onChange:     PropTypes.func.required,
  })
}

export default IntervalSelect
