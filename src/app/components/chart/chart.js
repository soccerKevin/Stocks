import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import moment from 'moment'
import LineChart from './lineChart'
import {
  Autocomplete,
  Box,
  TextField,
} from '@material-ui/core'

import { COMPANIES, COMPANY_HASH } from 'conf/companies'

import './style/chart.less'

const normalize = (data) => data.map((point) => {
  point.xName = moment(point.timeStamp).format('DD-HH:mm')
  return point
})

const AutocompleteOption = (props, { symbol, name }) => (
  <li {...props}>
    <span>{symbol}</span><span className='labelName'>&nbsp;({name})</span>
  </li>
)

const AutocompleteInput = (params) => (
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

const getData = async ({ queryKey: [_key, { symbol }] }) => (
  fetch(`/api/stock/${symbol}`)
  .then((res) => res.json())
  .then((data) => normalize(data))
)

const Chart = ({ symbol: symb }) => {
  const [symbol, setSymbol] = useState(symb)
  const query = useQuery([symbol, { symbol }], getData)

  return (
    <Box className='chart'>
      <Box className='header'>
        <h2 className='companyName'>{COMPANY_HASH[symbol]}</h2>
        <Autocomplete
          options={COMPANIES}
          renderOption={AutocompleteOption}
          renderInput={AutocompleteInput}
          filterOptions={filterOptions}
          getOptionSelected={getOptionSelected}
          getOptionLabel={getOptionLabel}
          autoHighlight
          autoComplete
          disableClearable
          className='companySelect'
          onChange={(e, value) => setSymbol(value.symbol)}
          defaultValue={symb}
        />
      </Box>
      <Box>
        <LineChart
          data={query.data}
          width={730}
          height={250}
        />
      </Box>
    </Box>
  )
}

Chart.propTypes = {
  symbol: PropTypes.string,
}

Chart.defaultProps = {
  symbol: 'GROW',
}

export default Chart
