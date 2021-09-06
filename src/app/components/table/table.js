import React from 'react'
import PropTypes from 'prop-types'

import {
  Table as MaterialTable,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Skeleton,
} from '@material-ui/core'

import styles from './styles/table.less'

const Table = ({ data, dataOrder, headers, ready }) => {
  if (!ready) return <Skeleton />

  const dataKeys = Object.keys(data[0]);
  const labels = headers ? headers : dataKeys;
  const order = dataOrder ? dataOrder : dataKeys;

  return (
    <MaterialTable stickyHeader className='table'>
      <TableHead className='tableHeader'>
        <TableRow>
          {labels.map((label, i) => <TableCell className='cell' key={`header_${label}_${i}`}>{label}</TableCell>)}
        </TableRow>
      </TableHead>
      <TableBody>
        {
          data.map((row, ri) => (
            <TableRow key={`row_${ri}`}>
              {
                order.map((cellName, ci) => (
                  <TableCell className='cell' key={`data_${cellName}_${ri}`}>
                    {row[cellName]}
                  </TableCell>
                ))
              }
            </TableRow>
          ))
        }
      </TableBody>
    </MaterialTable>
  )
}

Table.propTypes = {
  data:      PropTypes.arrayOf(PropTypes.object),
  dataOrder: PropTypes.arrayOf(PropTypes.string),
  headers:   PropTypes.arrayOf(PropTypes.string),
}

export default Table;
