import React from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'
import LineChart from './lineChart'
import { 
  Autocomplete,
  Box,
  Container,
  TextField,
} from '@material-ui/core'

import companies from 'conf/companies'
const { COMPANIES, COMPANY_HASH } = companies

import './style/chart.less'

const normalize = (data) => data.map((point) => {
  point.xName = moment(point.timeStamp).format('DD-HH:mm')
  return point
})

const getData = async () => {
  return fetch('/api/stock/GROW')
  .then((res) => res.json())
  .then((data) => normalize(data))
}

const AutocompleteOption = (props, option, { selected }) => (
  <li {...props}>
    <span>{option.symbol}</span>
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

const Chart = () => {
  const query = useQuery('data', getData)

  return (
    <Box className='stockChart'>
      <Container className='header'>
        <Autocomplete 
          options={COMPANIES} 
          renderOption={AutocompleteOption}
          getOptionLabel={(option) => option.symbol}
          renderInput={AutocompleteInput}
          autoHighlight
          className='companySelect'
          inputValue='GROW'
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

export default Chart