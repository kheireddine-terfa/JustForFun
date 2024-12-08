import React from 'react'
import Plants from '../components/Plants'
import { myPlants } from '../constants/plants'
function PlantsPage() {
  return (
    <div>
      {' '}
      <h1 className="b-title">Plants Page</h1>
      <Plants plants={myPlants}></Plants>
    </div>
  )
}

export default PlantsPage
