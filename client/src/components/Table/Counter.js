import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDataPurchase } from '../../actions/purchases'

export default function Counter({ id }) {
  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()
  const purchase = useSelector(state => state.purchase)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    if (quantity !== 0 || purchase.length > 0) {
      let arrPurchase = purchase;
      var changeMade = false
      arrPurchase.map(el => {
        if (el.id === id) {
          el.quantity = quantity;
          changeMade = true;
        }
      })
      console.log(arrPurchase)
      if (!changeMade) {
        const newData = {
          id: id,
          quantity: quantity
        }
        arrPurchase.push(newData)
        dispatch(addDataPurchase(arrPurchase))
      } else {
        dispatch(addDataPurchase(arrPurchase))
      }
    }
  }, [quantity])

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
    <td> 
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <button type='button' onClick={handleAddCounter}>+</button>
      <input
        id={id}
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
      id={id}
      onChange={handleChangePrice}
      type='number'
      value={price}
    />
    </td>
    </>
  )
}
