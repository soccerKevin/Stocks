import React from 'react'
import PropTypes from 'prop-types'
import { Virtuoso } from 'react-virtuoso'

import {
  Table as MaterialTable,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Skeleton,
} from '@material-ui/core'

import styles from './styles/table.less'

const Row = ({ row, key, order }) => (
  <TableRow key={`row_${key}`}>
    {
      order.map((cellName) => (
        <TableCell className={`cell ${cellName}`} key={`data_${cellName}_${key}`}>
          {row[cellName]}
        </TableCell>
      ))
    }
  </TableRow>
)

const Table = ({ data, dataOrder, headers, ready }) => {
  if (!ready) return <Skeleton />

  const dataKeys = Object.keys(data[0]);
  const labels = headers ? headers : dataKeys;
  const order = dataOrder ? dataOrder : dataKeys;

  return (
    <div className='table'>
      <TableHead className='tableHeader'>
        <TableRow>
          {labels.map((label, i) => <TableCell className={`cell ${label}`} key={`header_${label}_${i}`}>{label}</TableCell>)}
        </TableRow>
      </TableHead>
      <Virtuoso
        style={{ height: '400px', width: '900px' }}
        totalCount={data.length}
        data={data}
        itemContent={(i, row) => <Row order={order} key={i} row={row}/>}
      />
    </div>
  )
}

Table.propTypes = {
  data:      PropTypes.arrayOf(PropTypes.object),
  dataOrder: PropTypes.arrayOf(PropTypes.string),
  headers:   PropTypes.arrayOf(PropTypes.string),
}

export default Table;
