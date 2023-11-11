import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Products() {

    const [listOfProducts, setListOfProducts] = useState([]);

    let navigate = useNavigate();


    useEffect(() => {
      axios.get("http://localhost:3001/products").then((response) => {
        setListOfProducts(response.data);
        //console.log(response.data);
      });
    }, []);

  return (
    <div className='App' >
        <button className='addProduct' onClick={() => {navigate(`/addProduct`)}}>Add Other Product</button>
        <div className="ProductsApp">{listOfProducts.map((value, key) => { 
        return (
          <div className="product" onClick={() => {navigate(`/product/${value.id}`)}}>
            <div className='name'>{value.name}</div> 
            <div className='body'>
                <div className='quantity'>Quantity: {value.quantity * 1000}g</div>
                <div className='calories'>Calories: {value.totalCalories}</div>
                <div className='ingredients'>
                    Ingredients: 
                    {Object.entries(value.ingredients).map(([key, value]) => (
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

export default Products
