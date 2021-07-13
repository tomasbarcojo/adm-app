import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDataPurchase } from '../../actions/purchases'

export default function Counter({ id }) {
  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()
  const purchase = useSelector(state => state.purchase)
  let data = []

  const handleChangeInput = (event) => {
    var changeMade = false
    if (data.length > 0) {
      data.map(el => {
        if (el.articleId === event.target.id) {
          el.percentage = event.target.value;
          changeMade = true;
        }
      })
      if (!changeMade) {
        const newData = {
          articleId: event.target.id,
          percentage: event.target.value
        }
        data.push(newData)
      }
    } else {
      const newData = {
        articleId: event.target.id,
        percentage: event.target.value
      }
      data.push(newData)
    }
  }

  useEffect(() => {
    dispatch(addDataPurchase(data))
  }, [quantity])

  const handleAddCounter = () => {
    if (Number.isNaN(quantity)) {
      setQuantity(1)
      dispatch(addDataPurchase(data))
    } else {
      setQuantity(quantity + 1)
      dispatch(addDataPurchase(data))
    }
  }

  const handleReduceCounter = () => {
    setQuantity(quantity - 1)
    if (quantity <= 0) {
      setQuantity(0)
      dispatch(addDataPurchase(data))
    }
  }

  const handleCounter = (e) => {
    const value = parseInt(e.target.value);
    if (value < 1) {
      setQuantity(0)
      dispatch(addDataPurchase(data))
    } else {
      setQuantity(value)
      dispatch(addDataPurchase(data))
    }
  }

  return (
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
  )
}
