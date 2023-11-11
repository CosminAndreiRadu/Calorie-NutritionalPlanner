import React from 'react'
import {Link} from "react-router-dom"
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { useEffect, useState} from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import axios from "axios";
import * as Yup from 'yup';

 function GenerateMealPlan() {
    const email = sessionStorage.getItem("email");

    const [listOfRecipes, setlistOfRecipes] = useState([]);
    const [listOfConstraintedRecipes, setlistOfConstraintedRecipes] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        axios.get("http://localhost:3001/recipes").then((response) => {
          setlistOfRecipes(response.data);
        });
      }, []);

    const initialValues = {
        name: "",
        type: "",
    };



    const  onSubmit = async (data) => {

        let score;
        let constraints;
        let selectedRecipeIds = [];
        var userId;




        async function fetchData() {
          try {
            const response1 = await axios.get(`http://localhost:3001/authentication/${email}`);
            const userId = response1.data;
        
            const response2 = await axios.get(`http://localhost:3001/profiles/${userId}`);
            const { score, constraints } = response2.data;
        
            let listOfConstraintedRecipes = listOfRecipes;
            if (constraints) {
              listOfConstraintedRecipes = listOfRecipes.filter((recipe) =>
                constraints.includes(recipe.category)
              );
            }

            console.log(listOfConstraintedRecipes);
        
            const selectedRecipeIds = [];
            let leftScore;
        
            switch (data.type) {
              case 'cut':
                leftScore = score - 300;
                break;
              case 'maintain':
                leftScore = score + 50;
                break;
              case 'bulk':
                leftScore = score + 300;
                break;
              default:
                break;
            }
        
            while (selectedRecipeIds.length < 3 && listOfConstraintedRecipes.length > 0) {
              const randomArrayIndex = Math.floor(Math.random() * listOfConstraintedRecipes.length);
              const randomRecipe = listOfConstraintedRecipes[randomArrayIndex];
        
              const response3 = await axios.get(`http://localhost:3001/recipes/portion/${randomRecipe.id}`);
              randomRecipe.totalCalories = response3.data.portion;
              randomRecipe.quantity = randomRecipe.quantity / response3.data.portions;
        
              if (randomRecipe.totalCalories <= leftScore) {
                selectedRecipeIds.push(randomRecipe.id);
                leftScore -= randomRecipe.totalCalories;
              }
        
              listOfConstraintedRecipes.splice(randomArrayIndex, 1);
            }
        
            console.log(selectedRecipeIds);
        
            const mealPlanData = {
              recipeIds: selectedRecipeIds,
              name: data.name,
              type: data.type,
              userId: userId
            };
            const response4 = await axios.post("http://localhost:3001/mealplans/generate", mealPlanData);
            console.log(response4);
        
            navigate("/mealplans");
          } catch (error) {
            console.error("Error:", error);
          }
        }
        
        fetchData();

    };



    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        type: Yup.string().required(),

    });


  return (
    <div className='App'>
<div className='createProfilePage'>
        {/* <Link to="/">Back</Link> */}
        <div className='createProfilePageForm'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <label>Meal Plan Name: </label>
                    <ErrorMessage name="name" component="span"/>
                    <Field autoComplete="off" id="inputGenerateMealPlan" name="name" placeholder="Example: 19 June Monday " />

                    <label>Goal : </label>
                    <ErrorMessage name="type" component="span"/>
                    <Field as="select" id="inputGenerateMealPlan" name="type">
                      <option value="">Select a Goal</option>
                        <option value="cut">Loose Weight</option>
                        <option value="mantain">Maintain</option>
                        <option value="bulk">Gain Weight</option>
                    </Field>
                    

                    <button type="submit">Generate MealPlan</button>
                </Form>
            </Formik>
        </div>
    </div>
    </div>
    
  )
}

export default GenerateMealPlan
