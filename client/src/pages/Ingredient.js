import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

function Ingredient() {
    let {id} = useParams();
    const [ingredientObject, setIngredientObject] = useState({});
    

    useEffect(() => {
        axios.get(`http://localhost:3001/ingredients/byId/${id}`).then((response) => {
        setIngredientObject(response.data); 
      });
      }, []);

  return (
      <div className='ingredientPage'>
        <div className='name'>{ingredientObject.name}</div>
        <div className='body'>
          <div className='portion'>Unit of measurement: {ingredientObject.portion}</div>
          <div className='caloriesPerPortion'> Calories: {ingredientObject.caloriesPerPortion}</div>
        </div>
        <div className='category'>{ingredientObject.category}</div>
      </div>
  )
}

export default Ingredient
