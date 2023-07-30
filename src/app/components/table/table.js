import React from 'react'
import PropTypes from 'prop-types'

import {
  Table as MaterialTable,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Skeleton,
} from '@material-ui/core'

import styles from './styles/table.less'

const Row = ({ row, index, order }) => (
  <TableRow key={`row_${index}`}>
    {
      order.map((cellName) => (
        <TableCell className={`cell ${cellName}`} key={`data_${cellName}_${index}`}>
          {row[cellName]}
        </TableCell>
      ))
    }
  </TableRow>
)

Row.propTypes = {
  row:   PropTypes.object,
  index: PropTypes.number,
  order: PropTypes.arrayOf(PropTypes.string),
}

const Table = ({ data, dataOrder, headers, ready }) => {
  if (!ready) return <Skeleton />

  const dataKeys = Object.keys(data[0])
  const labels = headers ? headers : dataKeys
  const order = dataOrder ? dataOrder : dataKeys

  return (
    <TableContainer>
      <MaterialTable className='table'>
        <TableHead className='tableHeader'>
          <TableRow>
            {
              labels.map((label, i) => <TableCell className={`cell ${label}`} key={`header_${label}_${i}`}>{label}</TableCell>)
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((row, ri) => (
              <TableRow key={`row_${ri}`}>
                {
                  order.map((key, ci) => <TableCell key={`cell_${ri}_${ci}`}>{row[key]}</TableCell>)
                }
              </TableRow>
            ))
          }
        </TableBody>
      </MaterialTable>
    </TableContainer>
  )
}

Table.propTypes = {
  data:      PropTypes.arrayOf(PropTypes.object),
  dataOrder: PropTypes.arrayOf(PropTypes.string),
  headers:   PropTypes.arrayOf(PropTypes.string),
}

export default Table
