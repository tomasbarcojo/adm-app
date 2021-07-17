import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDataPurchase } from '../../actions/purchases'
import Row from './Row';

export default function TableHtml(props) {
  const { tableData } = props;
  const total = useSelector(state => state.purchaseTotal)

  return (
    <div style={{overflowX: 'auto'}}>
      <table>
        <tr>
          <th>ID</th>
          <th>Articulo</th>
          <th>Stock actual</th>
          <th>Cantidad</th>
          <th>Precio de compra</th>
          <th>Monto</th>
        </tr>
        {tableData.map((prop, key) => {
          return (
            <tr>
              <Row key={key} props={prop} />
            </tr>
          )
        })}

      </table>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <h3>Total de la compra: $ {total}</h3>
      </div>
    </div>
  )
}
