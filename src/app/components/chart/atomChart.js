import React from 'react'

import PropTypes from 'prop-types'

import classNames from 'classnames'

import { Box, Skeleton } from '@material-ui/core'
import { ResponsiveContainer } from 'recharts'
import { Rnd } from 'react-rnd'

import CandleChart from './candleChart'

import './style/chart.less'

const AtomChart = ({ data, resizeable, draggable, ready, width, height }) => (
  <Rnd
    className={classNames(['chart', { ['immobile']: !draggable }])}
    default={{ x: 10, y: 10, width, height }}
    enableResizing={resizeable}
    disableDragging={!draggable}
  >
    <Box>
      <ResponsiveContainer width='100%' height='100%'>
        {
          ready
            ? <CandleChart data={data} />
            : <Skeleton />
        }
      </ResponsiveContainer>
    </Box>
  </Rnd>
)

AtomChart.propTypes = {
  resizeable: PropTypes.bool,
  draggable:  PropTypes.bool,
  data:       PropTypes.arrayOf(PropTypes.shape({
    timestamp: PropTypes.string,
    volume:    PropTypes.number,
    open:      PropTypes.number,
    close:     PropTypes.number,
    high:      PropTypes.number,
    low:       PropTypes.number,
  })),
  ready:      PropTypes.bool,
  width:      PropTypes.string,
  height:     PropTypes.string,
}

AtomChart.defaultProps = {
  resizeable: true,
  draggable:  true,
  ready:      true,
  data:       [],
  width:      '1000px',
  height:     '500px',
}

export default AtomChart
