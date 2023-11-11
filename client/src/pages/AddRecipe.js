import React from 'react';
import {Formik, Form, Field, ErrorMessage, FieldArray, FormikProps} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function AddRecipe() {
    const navigate = useNavigate();

    const [listOfRecipes, setListOfRecipes] = useState([]);

    const [ingredients, setIngredients] = useState([]);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:3001/ingredients').then((response) => {
            const names = response.data.map((ingredient) => ingredient.name);
            setIngredients(names);
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    
    useEffect(() => {
        axios.get('http://localhost:3001/products').then((response) => {
            const names = response.data.map((product) => product.name);
            setProducts(names);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    console.log(ingredients)
    console.log(products)


    const initialValues = {
        name: "",
        text: "",
        category: "",
        quantity: "",
        ingredients: [],
        products: [],
    };

    
    const onSubmit = (data) => {
        const postData = {
            name: data.name,
            text: data.text,
            category: data.category,
            quantity: data.quantity,
            ingredients: data.ingredients.reduce((acc, ingredient) => {
                acc[ingredient.name] = ingredient.quantity;
                return acc;
            }, {}),
            products: data.products.reduce((acc, product) => {
                acc[product.name] = product.quantity;
                return acc;
            }, {})
        };


        axios.post("http://localhost:3001/recipes", postData).then((response) => {
            setListOfRecipes(postData)
            console.log("it worked");
        });
        navigate("/recipes");


    };


    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        text: Yup.string().required(),
        quantity: Yup.number().required(),
        ingredients: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required(),
                quantity: Yup.string().required(),
            })
        ),
        products: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required(),
                quantity: Yup.string().required(),
            })
        ),
    });


  return ( 
    <div className='App'>
<div className="addRecipePage">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
        {({ values }) => (
        <Form>
            <label>Product Name: </label>
            <ErrorMessage name="name" component="span"/>
            <Field autoComplete="off" id="inputAddRecipe" name="name" placeholder="Example: Recipe" />
            <label>Instructions: </label>
            <ErrorMessage name="text" component="span"/>
            <Field autoComplete="off" id="inputAddRecipe" name="text" placeholder="Example: Add 2 tablespoons of sugar... " />
            <label>Category: </label>
            <ErrorMessage name="category" component="span"/>
            <Field as="select" id="inputAddRecipe" name="category">
                <option value="">Regular</option>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="lactose-free">Lactose-free</option>
                <option value="peanuts-free">Peanuts-free</option>
                <option value="glucose-free">Glucose-free</option>
            </Field>
            <label>Quantity: </label>
            <ErrorMessage name="quantity" component="span"/>
            <Field autoComplete="off" id="inputAddRecipe" name="quantity" placeholder="Example: 2.5" />

            <FieldArray name="ingredients">
                {({ push, remove }) => (
                  <>
                    <label>Ingredients: </label>
                    {values.ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <Field autoComplete="off" name={`ingredients[${index}].name`} as="select" placeholder="Ingredient Name:">
                                <option value="">Select an ingredient</option>
                                {ingredients.map((ingredientName, i) => (
                                    <option key={i} value={ingredientName}>{ingredientName}</option>
                                ))}
                            </Field>
                            <ErrorMessage name={`ingredientsp${index}].name`} component = "span"/>
                            <Field autoComplete="off" name={`ingredients[${index}].quantity`} placeholder="Ingredient Quantity:" />
                            <ErrorMessage name={`ingredients[${index}].quantity`} component = "span"/>
                            {index > 0 && (
                                <button type="button" onClick={() => remove(index)}>
                                    Remove Last Ingredient
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={() => push({name: "", quantity: ""})}>
                        Add Ingredient
                    </button>
                  </>
                )}
            </FieldArray>
            <FieldArray name="products">
                {({ push, remove }) => (
                  <>
                    <label>Products: </label>
                    {values.products.map((product, index) => (
                        <div key={index}>
                            <Field autoComplete="off" name={`products[${index}].name`} as="select" placeholder="Product Name:">
                                <option value="">Select a Product</option>
                                {products.map((productName, i) => (
                                    <option key={i} value={productName}>{productName}</option>
                                ))}
                            </Field>
                            <ErrorMessage name={`products${index}].name`} component = "span"/>
                            <Field autoComplete="off" name={`products[${index}].quantity`} placeholder="Product Quantity:" />
                            <ErrorMessage name={`products[${index}].quantity`} component = "span"/>
                            {index > 0 && (
                                <button type="button" onClick={() => remove(index)}>
                                    Remove Last Product
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={() => push({name: "", quantity: ""})}>
                        Add Product
                    </button>
                  </>
                )}
            </FieldArray>

            <button type="submit">Add Recipe</button>
        </Form>
        )}
       </Formik>
    </div>
    </div>
    
  );
}

export default AddRecipe;
