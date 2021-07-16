import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDataPurchase } from '../../actions/purchases'

export default function Counter({ props }) {
  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()
  const purchase = useSelector(state => state.purchase)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    if (quantity !== 0 || purchase.length > 0) {
      let arrPurchase = purchase;
      var changeMade = false
      arrPurchase.map(el => {
        if (el.id === props.id) {
          el.quantity = quantity;
          el.price = price;
          changeMade = true;
        }
      })
      console.log(arrPurchase)
      if (!changeMade) {
        const newData = {
          id: props.id,
          quantity: quantity,
          price: price
        }
        arrPurchase.push(newData)
        dispatch(addDataPurchase(arrPurchase))
      } else {
        dispatch(addDataPurchase(arrPurchase))
      }
    }
  }, [quantity, price])

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
        className=''
        type='number'
        onChange={handleCounter}
        value={quantity}
      />
      <button type='button' onClick={handleReduceCounter}>-</button>
    </div>
    </td>
    <td>
    <input
      id={props.id}
      onChange={handleChangePrice}
      type='number'
      value={price}
    />
    </td>
    <td>$ {quantity && price ? quantity * price : 0}</td>
    </>
  )
}
