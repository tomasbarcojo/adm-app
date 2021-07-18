import React from 'react'
import { useSelector } from 'react-redux'
import Row from './Row';

export default function TableHtml(props) {
  const { tableData} = props;
  const total = useSelector(state => state.purchaseTotal)

  return (
    <div style={{overflowX: 'auto'}}>
      <table>
        <tr>
          <th className='htmlTableTH'>ID</th>
          <th className='htmlTableTH'>Articulo</th>
          <th className='htmlTableTH'>Stock actual</th>
          <th className='htmlTableTH'>Cantidad</th>
          <th className='htmlTableTH'>Precio de compra</th>
          <th className='htmlTableTH'>Monto</th>
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
