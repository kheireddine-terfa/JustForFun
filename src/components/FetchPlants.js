import { useEffect } from 'react'

function FetchPlants() {
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/plants')
        const data = await response.json()
        localStorage.setItem('plants', JSON.stringify(data.plants))
      } catch (error) {
        console.error('Failed to fetch plants:', error)
      }
    }

    fetchPlants()
  }, [])

  return null
}

export default FetchPlants
