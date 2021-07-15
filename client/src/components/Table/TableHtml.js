import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDataPurchase } from '../../actions/purchases'
import Counter from './Counter';
import InputPrice from './PurchasePriceInput'

export default function TableHtml(props) {
  const { tableData } = props;
  const dispatch = useDispatch();
  const [purchasePrice, setPurPrice] = useState({})
  const purchase = useSelector(state => state.purchase)

  return (
    <div>
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
              {prop.data.map((prop, key) => {
                return (
                  <td key={key}>{prop}</td>
                )
              })}
              <td>
                <Counter id={prop.id} />
              </td>
              <td>
                <InputPrice id={prop.id} />
              </td>
              <td>$ 100</td>
            </tr>
          )
        })}

      </table>
    </div>
  )
}
