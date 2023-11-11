import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

function Recipe() {
    let {id} = useParams();
    const [recipeObject, setRecipeObject] = useState({});
    const [ingredientList, setIngredientList] = useState([]);
    const [productList, setProductList] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:3001/recipes/byId/${id}`).then((response) => {
        setRecipeObject(response.data); 
      });
      }, []);

    useEffect(() => {
        axios.get(`http://localhost:3001/recipes/getIngredientsFromRecipe/${id}`).then((response) => {
        setIngredientList(response.data); 
    });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:3001/recipes/getProductsFromRecipe/${id}`).then((response) => {
        setProductList(response.data); 
    });
    }, []);

  return (
    <div className='recipePageContainer'>
        <div className='recipePage'>
            <div className='name'>{recipeObject.name}</div>
            <div className='body'>
                <div className='text'>Steps: {recipeObject.text}</div>
                <div className='quantity'>Quantity: {recipeObject.quantity * 1000}g</div>
                <div className='calories'>Calories: {recipeObject.totalCalories}</div>
                {recipeObject.ingredients && (
                <div className='ingredients'>
                    Ingredients:
                    {Object.entries(recipeObject.ingredients).map(([key, value]) => (
                    <span key={key}>
                        {key}: {value},
                    </span>
                    ))}
                </div>
                )}
                {recipeObject.products && (
                <div className='products'>
                    Products:
                    {Object.entries(recipeObject.products).map(([key, value]) => (
                    <span key={key}>
                        {key}: {value},
                    </span>
                    ))}
                </div>
                )}

            </div>
            <div className='category'>{recipeObject.category}</div>
        </div>
        <div className='recipePageIngredientsAndProducts'>
            <div className='recipePageIngredients'>
            {ingredientList.map((value, key) => { 
            return (
            <div className="ingredient">
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
            <div className='recipePageProducts'>
            {productList.map((value, key) => { 
            return (
            <div className="product">
                <div className='name'>{value.name}</div>
                <div className='body'>
                    <div className='quantity'>Package quantity: {value.quantity}</div>
                    <div className='totalCalories'> Calories: {value.totalCalories}</div>
                </div>
                <div className='category'>{value.category}</div>
            </div>
        );
      })}
            </div>

        </div>
    </div>
  )
}

export default Recipe
