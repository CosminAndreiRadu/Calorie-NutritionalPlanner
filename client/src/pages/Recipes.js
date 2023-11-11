import React from 'react'
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Recipes() {

    const [listOfRecipes, setlistOfRecipes] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
      axios.get("http://localhost:3001/recipes").then((response) => {
        setlistOfRecipes(response.data);
        //console.log(response.data);
      });
    }, []);

  return (
    <div className="App">
      <button className='addRecipe' onClick={() => {navigate(`/addRecipe`)}}>Add Other Recipe</button>

      <div className="recipesPage">{listOfRecipes.map((value, key) => { 
          return (
            <div className="recipe" onClick={() => {navigate(`/recipe/${value.id}`)}}>
              <div className='name'>{value.name}</div> 
              <div className='body'>
                  <div className='text'>Steps: {value.text.length > 50 ? value.text.substring(0, 50) + "..." : value.text}</div>
                  <div className='quantity'>Quantity: {value.quantity * 1000}g</div>
                  <div className='calories'>Calories: {value.totalCalories}</div>
                  <div className='ingredients'>
                      Ingredients: {Object.entries(value.ingredients).map(([key, value]) => (
                          <span key={key}>
                          {key}: {value}{', '}
                          </span>
                      ))}
                  </div>
                  <div className='products'>
                      Products: {Object.entries(value.products).map(([key, value]) => (
                          <span key={key}>
                          {key}: {value}{', '}
                          </span>
                      ))}
                  </div>
              </div>
              <div className='category'>{value.category}</div>
            </div>
          );
        })}
        </div>
    </div>

  )
}

export default Recipes
