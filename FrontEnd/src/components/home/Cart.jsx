import { useContext } from 'react'

const Cart = (CartContext) => {
  const { cart, setCart } = useContext(CartContext)
  const handleRemove = (id) => {
    const newCart = cart.filter((item) => item.id !== id)
    setCart(newCart)
  }
  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Cart
