import React from 'react';
import Row from './Row';

export default function TableHtml(props) {
  const { tableData } = props;
  
  return (
    <div style={{ overflowX: 'auto' }}>
      <table id='htmlTableStyle'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Articulo</th>
            <th>Stock actual</th>
            <th>Cantidad</th>
            <th>Precio unitario + IVA</th>
            <th>Monto descuento</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((prop, key) => {
            return <Row key={key} props={prop} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
