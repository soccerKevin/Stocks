import React from 'react'
import PropTypes from 'prop-types'

import { Autocomplete, TextField } from '@material-ui/core'

import { RANGES } from 'conf/ranges'

import './style/intervalSelect.less'

const renderOption = (props, option) => (
  <li {...props}>
    <span>{option}</span>
  </li>
)

const renderInput = (params) => (
  <TextField
    {...params}
    label='Time Range'
    variant='standard'
    inputProps={{...params.inputProps}}
  />
)

const RangeSelect = (props) => (
  <Autocomplete
    options={RANGES}
    renderInput={renderInput}
    renderOption={renderOption}
    autoHighlight
    autoComplete
    disableClearable
    className='intervalSelect select'
    {...props}
  />
)

RangeSelect.propTypes = {
  options: PropTypes.shape({
    defaultValue: PropTypes.string,
    onChange:     PropTypes.func.required,
  }),
}

export default RangeSelect
