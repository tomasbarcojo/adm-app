import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDataPurchase, updateTotal } from '../../actions/purchases';

export default function Counter({ props }) {
  const purchase = useSelector((state) => state.purchase);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState('0');
  const [discount, setDiscount] = useState('0');
  var total = 0;

  useEffect(() => {
    if (quantity !== 0 || purchase.length > 0) {
      let arrPurchase = purchase;
      var changeMade = false;
      arrPurchase.forEach((el) => {
        if (el.productId === props.id) {
          el.quantity = quantity;
          el.price = price;
          el.discount = discount;
          el.total = quantity * price - discount;
          changeMade = true;
        }
      });
      if (!changeMade) {
        const newData = {
          productId: props.id,
          quantity,
          price,
          discount,
          total: quantity * price - discount,
        };
        arrPurchase.push(newData);
        dispatch(addDataPurchase(arrPurchase));
        getTotal(arrPurchase);
      } else {
        dispatch(addDataPurchase(arrPurchase));
        getTotal(arrPurchase);
      }
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
      <td>{props.id}</td>
      <td>{props.articleName}</td>
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
