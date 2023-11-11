import React from 'react'
import {Router, Link} from "react-router-dom"




function Home() {
  return (
  <div className='homePage'>
    <div className='content'>
      <div className='generateDiv'>
      <Link to="/generatemealplan">Generate New Meal Plan</Link>

      </div>
      <div className='viewDiv'>
      <Link to="/mealplans">View My Meal Plans</Link>

      </div>

          
    </div>
  </div>
  )
}

export default Home
