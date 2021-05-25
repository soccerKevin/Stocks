import React from 'react'
import PropTypes from 'prop-types'

import { Autocomplete, TextField } from '@material-ui/core'

import { TICKERS } from 'conf/tickers'

import './style/tickerSelect.less'

const renderOption = (props, { symbol, name }) => (
  <li {...props}>
    <span>{symbol}</span><span className='labelName'>&nbsp;({name})</span>
  </li>
)

const renderInput = (params) => (
  <TextField
    {...params}
    label='Ticker'
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
  return options.filter(({ symbol, name }) => symbol.match(r) || name.match(r)).slice(0, 100)
}

const TickerSelect = ({ ...options }) => (
  <Autocomplete
    options={TICKERS}
    renderOption={renderOption}
    renderInput={renderInput}
    filterOptions={filterOptions}
    getOptionSelected={getOptionSelected}
    getOptionLabel={getOptionLabel}
    autoHighlight
    autoComplete
    disableClearable
    className='tickerSelect select'
    {...options}
  />
)

TickerSelect.propTypes = {
  options: PropTypes.shape({
    defaultValue: PropTypes.string,
    onChange:     PropTypes.func.required,
  }),
}

export default TickerSelect
