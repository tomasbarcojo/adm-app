import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDataPurchase, updateTotal } from '../../actions/purchases'

export default function Counter({ props }) {
  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()
  const purchase = useSelector(state => state.purchase)
  const [price, setPrice] = useState(0)
  var total = 0;

  useEffect(() => {
    if (quantity !== 0 || purchase.length > 0) {
      let arrPurchase = purchase;
      var changeMade = false
      arrPurchase.map(el => {
        if (el.articleId === props.id) {
          el.quantity = quantity;
          el.price = price;
          el.total = quantity * price;
          changeMade = true;
        }
      })
      if (!changeMade) {
        const newData = {
          articleId: props.id,
          quantity: quantity,
          price: price,
          total: quantity * price
        }
        arrPurchase.push(newData)
        dispatch(addDataPurchase(arrPurchase))
        getTotal(arrPurchase)
      } else {
        dispatch(addDataPurchase(arrPurchase))
        getTotal(arrPurchase)
      }
    }
  }, [quantity, price])

  const getTotal = (arrPurchase) => {
    arrPurchase.map(el => {
      total = total + el.total
    })
    dispatch(updateTotal(total))
  }

  const handleAddCounter = () => {
    if (Number.isNaN(quantity)) {
      setQuantity(1)
    } else {
      setQuantity(quantity + 1)
    }
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

  const handleChangePrice = (event) => {
    const value = parseInt(event.target.value);
    if (value < 1) {
      setPrice(0)
    } else {
      setPrice(value)
    }
  }

  return (
    <>
    <td>{props.id}</td>
    <td>{props.articleName}</td>
    <td>{props.stock}</td>
    <td> 
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <button type='button' onClick={handleAddCounter}>+</button>
      <input
        id={props.id}
        style={{width: '50px', textAlign: 'center'}}
        type='number'
        onChange={handleCounter}
        value={quantity}
      />
      <button type='button' onClick={handleReduceCounter}>-</button>
    </div>
    </td>
    <td>
      <div style={{display: 'flex', flexDirection: 'row'}}>
      $ <input  
      id={props.id}
      style={{width: '70px', marginLeft: '7px'}}
      onChange={handleChangePrice}
      type='number'
      value={price}
    />
      </div>
    </td>
    <td>$ {quantity && price ? quantity * price : 0}</td>
    </>
  )
}
