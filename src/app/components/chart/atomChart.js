import React from 'react'

import PropTypes from 'prop-types'

import classNames from 'classnames'

import { Box, Skeleton } from '@material-ui/core'
import { ResponsiveContainer } from 'recharts'
import { Rnd } from 'react-rnd'

import CandleChart from './candleChart'

import './style/chart.less'

const AtomChart = ({ data, resizeable, draggable, ready }) => {
  return (
    <Rnd
      className={classNames(['chart', { ['immobile']: !draggable }])}
      default={{ x: 10, y: 10 }}
      enableResizing={resizeable}
      disableDragging={!draggable}
    >
      <Box>
        <ResponsiveContainer width='100%' height='80%'>
          {
            ready
              ? <Skeleton />
              : <CandleChart data={data} />
          }
        </ResponsiveContainer>
      </Box>
    </Rnd>
  )
}

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
}

AtomChart.defaultProps = {
  resizeable: true,
  draggable:  true,
  ready:      true,
  data:       [],
}

export default AtomChart
