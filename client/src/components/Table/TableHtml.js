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
  
  useEffect(() => {
    // if (purchasePrice !== 0 || purchase.length > 0) {
    //   let arrPurchase = purchase;
    //   var changeMade = false
    //   arrPurchase.map(el => {
    //     if (el.id === id) {
    //       el.purchasePrice = purchasePrice;
    //       changeMade = true;
    //     }
    //   })
    //   if (!changeMade) {
    //     const newData = {
    //       id: id,
    //       purchasePrice: purchasePrice,
    //     }
    //     arrPurchase.push(newData)
    //     dispatch(addDataPurchase(arrPurchase))
    //   } else {
    //     dispatch(addDataPurchase(arrPurchase))
    //   }
    // }
  }, [purchasePrice])

  const handleChangePrice = (event, id) => {
    setPurPrice({
      id: id,
      price: event.target.value
    })
  }

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
                <div>
                  <Counter id={prop.id}/>
                </div>
              </td>
              <td>
              <InputPrice />
              </td>
              <td>$ 100</td>
            </tr>
          )
        })}

      </table>
    </div>
  )
}
