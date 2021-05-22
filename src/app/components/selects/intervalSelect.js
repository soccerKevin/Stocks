import React from 'react'
import PropTypes from 'prop-types'
import { isObject } from 'lodash'

import { Autocomplete, TextField } from '@material-ui/core'

import { INTERVALS_HASH } from 'conf/intervals'

import './style/intervalSelect.less'

const renderOption = (props, { label }) => (
  <li {...props}>
    <span>{label}</span>
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

const getOptionSelected = ({ label: oLabel, value: oValue }, val) => {
  if (isObject(val)) return oLabel === val.label
  const regex = new RegExp(val, 'i')
  return oLabel.match(regex) || oValue.match(regex)
}

const IntervalSelect = ({ onChange, ...rest }) => (
  <Autocomplete
    options={INTERVALS_HASH}
    renderInput={renderInput}
    renderOption={renderOption}
    getOptionSelected={getOptionSelected}
    autoHighlight
    autoComplete
    disableClearable
    className='intervalSelect select'
    onChange={(e, { value }) => onChange(e, value)}
    {...rest}
  />
)

IntervalSelect.propTypes = {
  options: PropTypes.shape({
    defaultValue: PropTypes.string,
    onChange:     PropTypes.func.required,
  }),
}

export default IntervalSelect
