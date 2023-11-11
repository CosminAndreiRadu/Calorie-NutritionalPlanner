import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';

function MealPlan() {
    let {id} = useParams();
    const [mealPlanObject, setMealPlanObject] = useState({});
    const [recipeList, setRecipeList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/mealplans/byId/${id}`).then((response) => {
            setMealPlanObject(response.data); 
      });
      }, []);

    useEffect(() => {
        axios.get(`http://localhost:3001/mealplans/getRecipesFromMealPlan/${id}`).then((response) => {
        setRecipeList(response.data); 
    });
    }, []);



  return (
    <div className='App'>

        <div className='mealPlanPage'>
            <div className='name'>{mealPlanObject.name}</div>
            <div className='type'>Scope: {mealPlanObject.type}</div>                
        </div>
            <div className='mealPlanPageRecipes'>
            {recipeList.map((value, key) => { 
            return (
                <div className="MPrecipe" onClick={() => {navigate(`/recipe/${value.id}`)}}>
                    <div className='name'>{value.name}</div>
                    <div className='body'>
                        <div className='quantity'>Quantity/cook: {value.quantity * 1000}g</div>
                        <div className='totalCalories'> Calories: {value.totalCalories}</div>
                    </div>
                    <div className='category'>{value.category}</div>
                </div>
                );
            })}
            </div>
            

    </div>
  )
}

export default MealPlan
