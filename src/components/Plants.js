import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchPlants, likePlant, addToCart } from '../state/plants/plantsSlice'
import Plant from './Plant'

function Plants() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { list: plants, loading, error } = useSelector((state) => state.plants)

  useEffect(() => {
    dispatch(fetchPlants())
  }, [dispatch])

  const handleLike = (id) => {
    dispatch(likePlant({ id, navigate }))
  }

  const handleAddToCart = (plantId, quantity) => {
    dispatch(addToCart({ plantId, quantity, navigate })).catch((err) =>
      alert(err.message),
    )
  }
  if (loading) return <p>Loading plants...</p>
  if (error) return <p>Error: {error}</p>
  return (
    <div className="container py-5">
      <h2 className="section-title text-center">Our Products</h2>
      <p className="section-description text-center">
        Discover our wide range of plants and cacti, carefully selected to bring
        a touch of nature to your home or garden.
      </p>{' '}
      {plants.length < 0 ? (
        <div>no plants to display</div>
      ) : (
        <div className="row mt-5">
          {plants.map((plant) => (
            <Plant
              plant={plant}
              key={plant.id}
              onLike={() => handleLike(plant.id)}
              onAddToCart={(quantity) => handleAddToCart(plant.id, quantity)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Plants
