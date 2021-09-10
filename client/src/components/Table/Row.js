import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDataPurchase, updateTotal } from '../../actions/purchases'
import NumberFormat from "react-number-format";

export default function Counter({ props }) {
  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()
  const purchase = useSelector(state => state.purchase)
  const [price, setPrice] = useState(0)
  const [float, setFloat] = useState(0)
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

  useEffect(() => {

  }, [price])

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
    const value = event.target.value
    if (value < 1) {
      setPrice(0)
    } else {
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });
      console.log(formatter.format(value).replace('$', ''));
      console.log(parseInt(formatter.format(value).replace('$', '')))
      // console.log(formatter.format(value))
      // console.log(typeof(formatter.format(value)))
      const newVal = 
      setPrice(formatter.format(value))
    }
  }

  return (
    <>
    <td className='htmlTableTD'>{props.id}</td>
    <td className='htmlTableTD'>{props.articleName}</td>
    <td className='htmlTableTD'>{props.stock}</td>
    <td className='htmlTableTD'> 
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
    <td className='htmlTableTD'>
      <div style={{display: 'flex', flexDirection: 'row'}}>
      {/* $ <input  
      id={props.id}
      style={{width: '70px', marginLeft: '7px'}}
      onChange={handleChangePrice}
      // type='number'
      value={price}
    /> */}
    {/* $ <NumberFormat
        thousandsGroupStyle="thousand"
        value={price}
        onChange={handleChangePrice}
        style={{width: '70px', marginLeft: '7px'}}
        decimalSeparator=","
        displayType="input"
        type="text"
        // value='number'
        thousandSeparator={false}
        allowNegative={true}
        decimalScale={3} /> */}

      $ <NumberFormat
        value={price}
        style={{width: '70px', marginLeft: '7px'}}
        displayType={'input'}
        thousandSeparator={false}
        decimalScale={3}
        onChange={handleChangePrice}
        />
    
      </div>
    </td>
    <td className='htmlTableTD'>$ {quantity && price ? (quantity * price).toFixed(2) : 0}</td>
    </>
  )
}
