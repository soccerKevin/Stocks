import React from 'react'
import PropTypes from 'prop-types'

import { Autocomplete, TextField } from '@material-ui/core'

import { INTERVALS } from 'conf/intervals'

import './style/intervalSelect.less'

const renderOption = (props, option) => (
  <li {...props}>
    <span>{option}</span>
  </li>
)

const renderInput = (params) => (
  <TextField
    {...params}
    label='Interval'
    variant='standard'
    inputProps={{...params.inputProps}}
  />
)

const IntervalSelect = (props) => (
  <Autocomplete
    options={INTERVALS}
    renderInput={renderInput}
    renderOption={renderOption}
    autoHighlight
    autoComplete
    disableClearable
    className='intervalSelect select'
    {...props}
  />
)

IntervalSelect.propTypes = {
  options: PropTypes.shape({
    defaultValue: PropTypes.string,
    onChange:     PropTypes.func.required,
  }),
}

export default IntervalSelect
