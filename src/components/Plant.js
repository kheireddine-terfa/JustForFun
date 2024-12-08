import React, { useState } from 'react'

function Plant({ plant, onLike, onAddToCart }) {
  const [quantity, setQuantity] = useState(1)
  // const [addedToCart, setAddedToCart] = useState(false)
  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value))
  }

  return (
    <div className="col-md-3 col-sm-6 mb-4">
      <div className="card product-card">
        <img src={plant.image} className="card-img-top" alt={plant.name} />
        <div className="card-body">
          <h5 className="card-title">{plant.name}</h5>
          <p className="card-text">{plant.description}</p>
          <p className="card-price fw-bold">{plant.price} DA</p>
          <div className="d-flex justify-content-between align-items-center">
            <button
              onClick={onLike}
              className={`btn ${
                plant.liked ? 'btn-danger' : 'btn-outline-danger'
              }`}
            >
              {plant.liked ? 'Unlike' : 'Like'}
            </button>
            <div>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="form-control form-control-sm"
                min="1"
              />
              <button
                onClick={() => onAddToCart(quantity)}
                className="btn btn-warning mt-2 w-100 "
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Plant
