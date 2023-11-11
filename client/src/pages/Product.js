import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

function Product() {
    let {id} = useParams();
    const [productObject, setProductObject] = useState({});
    const [ingredientList, setIngredientList] = useState([]);
    

    useEffect(() => {
        axios.get(`http://localhost:3001/products/byId/${id}`).then((response) => {
        setProductObject(response.data); 
      });
      }, []);

    useEffect(() => {
        axios.get(`http://localhost:3001/products/getIngredientsFromProduct/${id}`).then((response) => {
        setIngredientList(response.data); 
    });
    }, []);

  return (
    <div className='productPageContainer'>
        <div className='productPage'>
            <div className='name'>{productObject.name}</div>
            <div className='body'>
                <div className='quantity'>Quantity: {productObject.quantity*1000}g</div>
                <div className='totalCalories'> Calories: {productObject.totalCalories}</div>
                {productObject.ingredients && (
                <div className='ingredients'>
                    Ingredients:
                    {Object.entries(productObject.ingredients).map(([key, value]) => (
                    <span key={key}>
                        {key}: {value},
                    </span>
                    ))}
                </div>
                )}

            </div>
            <div className='category'>{productObject.category}</div>
        </div>
        <div className='productPageIngredients'>
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
    </div>
  )
}

export default Product
