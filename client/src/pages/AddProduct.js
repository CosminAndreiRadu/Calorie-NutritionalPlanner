import React from 'react';
import {Formik, Form, Field, ErrorMessage, FieldArray, FormikProps} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function AddProduct() {
    const navigate = useNavigate();

    const [listOfProducts, setListOfProducts] = useState([]);

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/ingredients').then((response) => {
            const names = response.data.map((ingredient) => ingredient.name);
            setIngredients(names);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    console.log(ingredients)

    const initialValues = {
        name: "",
        category: "",
        quantity: "",
        ingredients: [],
    };

    
    const onSubmit = (data) => {
        const postData = {
            name: data.name,
            category: data.category,
            quantity: data.quantity,
            ingredients: data.ingredients.reduce((acc, ingredient) => {
                acc[ingredient.name] = ingredient.quantity;
                return acc;
            }, {})
        };
        // console.log(postData.ingredients)


        axios.post("http://localhost:3001/products", postData).then((response) => {
            setListOfProducts(postData)
            console.log("it worked");
        });
        navigate("/products");
    };


    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        category: Yup.string().required(),
        quantity: Yup.number().required(),
        ingredients: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required(),
                quantity: Yup.string().required(),
            })
        ),
    });


  return ( 
    <div className="addProductPage">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
        {({ values }) => (
        <Form>
            <label>Product Name: </label>
            <ErrorMessage name="name" component="span"/>
            <Field autoComplete="off" id="inputAddProduct" name="name" placeholder="Example: Coca Cola" />
            <label>Category: </label>
            <ErrorMessage name="category" component="span"/>
            <Field autoComplete="off" id="inputAddProduct" name="category" placeholder="Example: sugars " />
            <label>Quantity: </label>
            <ErrorMessage name="quantity" component="span"/>
            <Field autoComplete="off" id="inputAddProduct" name="quantity" placeholder="Example: 2.5" />

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

            <button type="submit">Add Product</button>
        </Form>
        )}
       </Formik>
    </div>
  );
}

export default AddProduct;
