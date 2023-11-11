import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function AddIngredient() {
    const navigate = useNavigate();

    const [listOfIngredients, setListOfIngredients] = useState([]);


    const initialValues = {
        name: "",
        category: "",
        portion: "",
        caloriesPerPortion: "",
    };

    
    const onSubmit = (data) => {
            axios.post("http://localhost:3001/ingredients", data).then((response) => {
              setListOfIngredients(response.data);
              console.log("test working");
            });

            navigate(`/ingredients`);
    };


    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        category: Yup.string().required(),
        portion: Yup.string().required(),
        caloriesPerPortion: Yup.number().required(),
    });


  return ( 
    <div className="addIngredientPage">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
            <label>Ingredient Name: </label>
            <ErrorMessage name="name" component="span"/>
            <Field autoComplete="off" id="inputAddIngredient" name="name" placeholder="Example: Salt" />
            <label>Category: </label>
            <ErrorMessage name="category" component="span"/>
            <Field autoComplete="off" id="inputAddIngredient" name="category" placeholder="Example: meat /dairy" />
            <label>Portion Type: </label>
            <ErrorMessage name="portion" component="span"/>
            <Field autoComplete="off" id="inputAddIngredient" name="portion" placeholder="Example: 100g / teaspoon" />
            <label>Calories no.: </label>
            <ErrorMessage name="caloriesPerPortion" component="span"/>
            <Field autoComplete="off" id="inputAddIngredient" name="caloriesPerPortion" placeholder="Example: 15" />
            <button type="submit">Add Ingredient</button>
        </Form>
       </Formik>
    </div>
  );
}

export default AddIngredient;
