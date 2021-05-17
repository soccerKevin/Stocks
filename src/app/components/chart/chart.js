import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import moment from 'moment'
import LineChart from './lineChart'
import {
  Autocomplete,
  Box,
  Container,
  TextField,
} from '@material-ui/core'

import { COMPANIES, COMPANY_HASH } from 'conf/companies'

import './style/chart.less'

const normalize = (data) => data.map((point) => {
  point.xName = moment(point.timeStamp).format('DD-HH:mm')
  return point
})

const AutocompleteOption = (props, option) => (
  <li {...props}>
    <span>{option}</span>
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
      <Container className='header'>
        <h2 className='companyName'>{COMPANY_HASH[symbol]}</h2>
        <Autocomplete
          options={COMPANIES}
          renderOption={AutocompleteOption}
          getOptionLabel={(option) => option}
          renderInput={AutocompleteInput}
          autoHighlight
          autoComplete
          disableClearable
          className='companySelect'
          onChange={(e, value) => setSymbol(value)}
          defaultValue={symb}
        />
      </Container>
      <Container>
        <LineChart
          data={query.data}
          width={730}
          height={250}
        />
      </Container>
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
