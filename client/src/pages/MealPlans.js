import React from 'react'
import axios from "axios";

import {Link} from "react-router-dom"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MealPlans() {

    const [listOfMealPlans, setlistOfMealPlans] = useState([]);
    const [listOfRecipes, setlistOfRecipes] = useState([]);
    const email = sessionStorage.getItem("email");
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:3001/authentication/${email}`).then((response) => {
            const userId = response.data;

            axios.get(`http://localhost:3001/mealplans/all/${userId}`).then((response) => {      
                setlistOfMealPlans(response.data);
            });

        });


      }, []);

  return (
    //<div className='App'> APP</div>
    <div className="App">
        {/* <Link to="/">Back</Link> */}
        <div className='mealPlans'>
            {listOfMealPlans.map((mealPlan) => { 
            return (
            <div className="mealPlan" onClick={() => {navigate(`/mealplan/${mealPlan.id}`)}}>
                <div className='name'>{mealPlan.name}</div> 
                <div className='body'>
                    <div className='type'>Goal: {mealPlan.type}</div>

                </div>
            </div>
            )
        })}
      </div>
    </div>
  )
}

export default MealPlans
