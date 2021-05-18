import React from 'react'
import PropTypes from 'prop-types'

import { Autocomplete, TextField } from '@material-ui/core'

import { COMPANIES } from 'conf/companies'

import './style/companySelect.less'

const renderOption = (props, { symbol, name }) => (
  <li {...props}>
    <span>{symbol}</span><span className='labelName'>&nbsp;({name})</span>
  </li>
)

const renderInput = (params) => (
  <TextField
    {...params}
    label='Company'
    variant='standard'
    inputProps={{...params.inputProps}}
  />
)

const getOptionSelected = ({ symbol, name }, value) => {
  const regex = new RegExp(value, 'i')
  return symbol.match(regex) || name.match(regex)
}

const getOptionLabel = (option) => option.symbol || option

const filterOptions = (options, { inputValue }) => {
  const r = new RegExp(`^${inputValue}`, 'i')
  return options.filter(({ symbol, name }) => symbol.match(r) || name.match(r))
}

const CompanySelect = ({ ...options }) => (
  <Autocomplete
    options={COMPANIES}
    renderOption={renderOption}
    renderInput={renderInput}
    filterOptions={filterOptions}
    getOptionSelected={getOptionSelected}
    getOptionLabel={getOptionLabel}
    autoHighlight
    autoComplete
    disableClearable
    className='companySelect'
    {...options}
  />
)

CompanySelect.propTypes = {
  options: PropTypes.shape({
    defaultValue: PropTypes.string,
    onChange:     PropTypes.func.required,
  })
}

export default CompanySelect