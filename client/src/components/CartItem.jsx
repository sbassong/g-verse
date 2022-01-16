import React, {useState} from "react";

const CartItem = (props) => {
  const [value, setValue] = useState(1)

  const decrementQuantity = () => {
    if (value <= 0) return value
    setValue(value - 1)
  }

  const incrementQuantity = () => setValue(value + 1)

  return (
    <div className='item-card'>
      <section className="img-wrapper">
        <img src={props.image} alt="" />
        <p>{props.title}</p>
      </section>
      
      <section className="hover-info">
        <div><p>USD ${props.price}</p></div>
        <button onClick={decrementQuantity} >-</button>
        <input type="text" value={`${value}`} />
        <button onClick={incrementQuantity} >+</button>
      </section>
    </div>
  )
}

export default CartItem