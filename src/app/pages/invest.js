import React from 'react'
import { useQuery } from 'react-query'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { getTicker, TICKERS_HASH } from 'conf/tickers'
import { useRecoilState } from 'recoil'
import { Box, Card, Container } from '@material-ui/core'
import moment from 'moment'

import { Table } from 'components/table'
import { AtomChart } from 'components/chart'
import { TickerSelect, IntervalSelect, RangeSelect } from 'components/selects'

import styles from './styles/invest.less'

const atomKey = 'invest'
const key = `AtomChart_${atomKey}`

import { atomFamily } from 'recoil';

let chartAtom;

const getCandle = async ({ queryKey: [_key, { symbol, ...options }] }) => (
  axios.get(`/api/stock/${symbol}/candle`, { params: options })
  .then((res) => res.data)
)

const getStats = async ({ queryKey: [_key, { symbol }] }) => (
  axios.get(`/api/stock/${symbol}/stats`)
  .then((res) => res.data)
)

const retry = (failureCount, error) => {
  if (error.message.includes('500')) return false
  if (failureCount >= 2) return false
  return true
}

const Stats = ({ symbol }) => {
  const { data, isLoading, isError } = useQuery([`stats_${symbol}`, { symbol }], getStats, { retry })
  if (isLoading || isError) return null

  const {
    currentPrice,
    marketChange,
    percentChange,
    beta,
    pegRatio,
    marketCap,
  } = data

  return (
    <Container>
      <Card>
        <h4>Current Price</h4>
        {currentPrice}
      </Card>
      <Card>
        <h4>Market Cap</h4>
        {marketCap}
      </Card>
    </Container>
  )
}

const Header = () => {
  const [state, setState] = useRecoilState(chartAtom(key))
  const { symbol, interval, range } = state
  const company = getTicker(symbol)

  return (
    <Container className='header'>
      <h1 className='tickerName'>{company.name}</h1>
      <Container>
        <Stats symbol={symbol} />
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
    </Container>
  )
}

const formatDate = (val) => moment(new Date(val)).format('MMM D, YYYY')
const formatNumber = (val) => val.toLocaleString()
const formatCurrency = (val) => '$' + val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")

const Invest = () => {
  let { symbol: symb = 'MSFT' } = useParams()
  symb = symb.toUpperCase()

  if (!chartAtom) chartAtom = atomFamily({ key: 'AtomChart', default: { symbol: symb, interval: '1day', range: '1year' } })

  const [state, setState] = useRecoilState(chartAtom(key))

  const { symbol, interval, range } = state;
  const {
    data: candleData,
    isLoading,
    isError
  } = useQuery([`candle_${symbol}`, { symbol, interval, range }], getCandle, { retry })

  let tableData;

  if (candleData) {
    tableData = candleData.map(({ timestamp, open, high, low, close, volume }) => ({
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
        <Header/>
        <Container className='investChart'>
          <AtomChart
            interval={'1day'}
            draggable={false}
            resizeable={false}
            atomKey={atomKey}
            ready={!(isLoading || isError)}
            data={candleData}
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
