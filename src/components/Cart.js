import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart, clearCart, validateCart } from '../state/cart/cartSlice'

function Cart() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('user'))

  // Access cart state from Redux store
  const { cart, loading, error, message } = useSelector((state) => state.cart)

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCart()) // Fetch cart data on component mount
    }
  }, [dispatch, user?.id])

  const handleValidate = () => {
    dispatch(validateCart()) // Pass userId to validate the cart
  }

  const handleClearCart = () => {
    if (user) {
      dispatch(clearCart()) // Dispatch clearCart action
    }
  }

  if (loading) {
    return <p>Loading your cart...</p>
  }
  if (error) {
    return <p>Error: {error}</p>
  }
  if (message) {
    return <p>{message}</p>
  }
  const { cartDetails, totalPrice } = cart
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cartDetails.length === 0 ? (
          <p className="text-center mt-5 fs-2 text-info">Your cart is empty.</p>
        ) : (
          <ul className="list-group">
            {cartDetails.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex">
                  <img
                    src={item.Plant.image}
                    alt={item.Plant.name}
                    className="img-thumbnail"
                    style={{
                      width: '50px',
                      height: '50px',
                      marginRight: '10px',
                    }}
                  />
                  <div>
                    <strong>{item.Plant.name}</strong>
                    <p>{item.Plant.description}</p>
                    <small>Quantity: {item.quantity}</small>
                  </div>
                </div>
                <span>{item.Plant.price * item.quantity} DA</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {cartDetails.length > 0 && (
        <div className="mt-3">
          <h4>Total Price: {totalPrice} DA</h4>
          <button onClick={handleValidate} className="btn btn-success me-2">
            Validate Buy
          </button>
          <button onClick={handleClearCart} className="btn btn-danger">
            Clear Cart
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart
