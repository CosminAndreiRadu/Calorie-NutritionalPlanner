import React from 'react'
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Ingredients() {

    const [listOfIngredients, setListOfIngredients] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
      axios.get("http://localhost:3001/ingredients").then((response) => {
        setListOfIngredients(response.data);
        //console.log(response.data);
      });
    }, []);

  return (
    <div className="App">
      <button className='addIngredient' onClick={() => {navigate(`/addIngredient`)}}>Add Other Ingredient</button>
      <div className='listOfIngredients'>{listOfIngredients.map((value, key) => { 
          return (
            <div className="ingredient" onClick={() => {navigate(`/ingredient/${value.id}`)}}>
              <div className='name'>{value.name}</div>
              <div className='body'>
                <div className='portion'>Unit of measurement: {value.portion}</div>
                <div className='caloriesPerPortion'> Calories: {value.caloriesPerPortion}</div>
              </div>
              <div className='category'>{value.category}</div>
    
            </div>
          );
        })}
        </div>
    </div>

  )
}

export default Ingredients
