import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDataPurchase, updateTotal } from '../../actions/purchases';

export default function Counter({ props }) {
  const newPurchase = useSelector((state) => state.newPurchase);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(props.price);
  const [discount, setDiscount] = useState('0');
  var total = 0;

  useEffect(() => {
    if (quantity !== 0 && price !== '0') {
      const purchaseEl = newPurchase.productList.find((el) => el.productId === props.productId);
      purchaseEl.quantity = quantity;
      purchaseEl.price = price;
      purchaseEl.discount = discount;
      purchaseEl.total = quantity * price - discount;
      getTotal(newPurchase.productList);
      dispatch(addDataPurchase(newPurchase));
    }
  }, [quantity, price, discount]);

  const getTotal = (arrPurchase) => {
    arrPurchase.forEach((el) => {
      total += el.total;
    });
    dispatch(updateTotal(total));
  };

  const handleAddCounter = () => {
    if (Number.isNaN(quantity)) {
      setQuantity(1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleReduceCounter = () => {
    setQuantity(quantity - 1);
    if (quantity <= 0) {
      setQuantity(0);
    }
  };

  const handleCounter = (e) => {
    const value = parseInt(e.target.value);
    if (value < 1) {
      setQuantity(0);
    } else {
      setQuantity(value);
    }
  };

  const handleChangePrice = (event) => {
    const value = event.target.value;
    if (value < 1) {
      setPrice(0);
    } else {
      setPrice(value);
    }
  };

  const handleChangeDiscount = (event) => {
    const value = event.target.value;
    if (value < 1) {
      setDiscount(0);
    } else {
      setDiscount(value);
    }
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  return (
    <tr>
      <td>{props.productId}</td>
      <td>{props.name}</td>
      <td>{props.stock}</td>
      <td>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <button type="button" onClick={handleAddCounter}>
            +
          </button>
          <input
            id={props.id}
            style={{ width: '50px', textAlign: 'center' }}
            type="number"
            onChange={handleCounter}
            value={quantity}
          />
          <button type="button" onClick={handleReduceCounter}>
            -
          </button>
        </div>
      </td>
      <td>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          ${' '}
          <input
            type="number"
            style={{ width: '70px', marginLeft: '7px' }}
            onChange={handleChangePrice}
            onFocus={handleFocus}
            value={price}
          />
        </div>
      </td>
      <td>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          ${' '}
          <input
            type="number"
            style={{ width: '70px', marginLeft: '7px' }}
            onChange={handleChangeDiscount}
            onFocus={handleFocus}
            value={discount}
          />
        </div>
      </td>
      <td>
        {quantity && price
          ? (quantity * price - discount).toLocaleString('es-AR', {
              style: 'currency',
              currency: 'ARS',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : '$ 0'}
      </td>
    </tr>
  );
}
