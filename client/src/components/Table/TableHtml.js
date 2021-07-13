import React, { useState } from 'react'
import Counter from './Counter';

export default function TableHtml(props) {
  const { tableData } = props;
  const [quantity, setQuantity] = useState(0)

  const handleAddCounter = () => {
    setQuantity(quantity + 1)
  }

  const handleReduceCounter = () => {
    setQuantity(quantity - 1)
    if (quantity <= 0) {
      setQuantity(0)
    }
  }

  const handleCounter = (e) => {
    const value = parseInt(e.target.value);
    if (value < 1) {
      setQuantity(0)
    } else {
      setQuantity(value)
    }
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
              <td><input type='number'/></td>
              <td>$ 100</td>
            </tr>
          )
        })}

      </table>
    </div>
  )
}
