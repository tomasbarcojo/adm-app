import React from 'react';
import Row from './Row';

export default function TableHtml(props) {
  const { tableData } = props;

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className='htmlTableStyle'>
        <thead>
          <tr>
            <th className="htmlTableTH">ID</th>
            <th className="htmlTableTH">Articulo</th>
            <th className="htmlTableTH">Stock actual</th>
            <th className="htmlTableTH">Cantidad</th>
            <th className="htmlTableTH">Precio unitario + IVA</th>
            <th className="htmlTableTH">Monto descuento</th>
            <th className="htmlTableTH">Total</th>
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
