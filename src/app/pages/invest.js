import React from 'react'
import { useQuery } from 'react-query'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { getTicker, TICKERS_HASH } from 'conf/tickers'
import { useRecoilState } from 'recoil'
import { Box, Container } from '@material-ui/core'
import moment from 'moment'

import { Table } from 'components/table'
import { AtomChart } from 'components/chart'
import { TickerSelect, IntervalSelect, RangeSelect } from 'components/selects'

import styles from './styles/invest.less'

const atomKey = 'invest'
const key = `AtomChart_${atomKey}`

import { atomFamily } from 'recoil';

let chartAtom;

const getData = async ({ queryKey: [_key, { symbol, ...options }] }) => (
  axios.get(`/api/stock/${symbol}/candle`, { params: options })
  .then((res) => res.data)
)

const retry = (failureCount, error) => {
  if (error.message.includes('500')) return false
  if (failureCount >= 2) return false
  return true
}

const Header = () => {
  const [state, setState] = useRecoilState(chartAtom(key))
  const { symbol, interval, range } = state
  const company = getTicker(symbol)

  return (
    <Container className='header'>
      <h2 className='tickerName'>{company.name}</h2>
      <Box className='controls'>
        <TickerSelect
          onChange={(e, value) => setState({ ...state, symbol: value.symbol })}
          defaultValue={symbol}
        />
        <IntervalSelect
          onChange={(e, value) => setState({ ...state, interval: value })}
          defaultValue={interval}
        />
        <RangeSelect
          onChange={(e, value) => setState({ ...state, range: value })}
          defaultValue={range}
        />
      </Box>
    </Container>
  )
}

const formatDate = (val) => moment(new Date(val)).format('MMM D, YYYY')
const formatNumber = (val) => val.toLocaleString()
const formatCurrency = (val) => '$' + val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")

const Invest = () => {
  let { symbol: symb = 'BTCT' } = useParams()
  symb = symb.toUpperCase()

  if (!chartAtom) chartAtom = atomFamily({ key: 'AtomChart', default: { symbol: symb, interval: '1day', range: '1year' } })

  const [state, setState] = useRecoilState(chartAtom(key))

  const { symbol, interval, range } = state;
  const { data, isLoading, isError } = useQuery([symbol, { symbol, interval, range }], getData, { retry })

  let tableData;

  if (data) {
    tableData = data.map(({ timestamp, open, high, low, close, volume }) => ({
      date:   formatDate(timestamp),
      open:   formatCurrency(open),
      high:   formatCurrency(high),
      low:    formatCurrency(low),
      close:  formatCurrency(close),
      volume: formatNumber(close),
    })).reverse()
  }

  return (
    <div id='invest'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Stock Investment</title>
      </Helmet>

      <Container className='body'>
        <Header state={state} setState={setState} />
        <Container className='investChart'>
          <AtomChart
            interval={'1day'}
            draggable={false}
            resizeable={false}
            atomKey={atomKey}
            ready={!(isLoading || isError)}
            data={data}
          />
        </Container>
        <Table
          data={tableData}
          ready={!(isLoading || isError)}
        />
      </Container>
    </div>
  )
}

export default Invest
