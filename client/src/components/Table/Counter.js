import React, { useState } from 'react'

export default function Counter() {
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
        <button classsName='' type='button' onClick={handleAddCounter}>+</button>
          <input
          className=''
          type='number'
          onChange={handleCounter}
          value={quantity}
          />
        <button classsName='' type='button' onClick={handleReduceCounter}>-</button>
    </div>
  )
}
