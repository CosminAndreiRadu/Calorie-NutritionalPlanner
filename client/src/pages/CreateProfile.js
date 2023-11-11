import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CreateProfile() {

    const email = sessionStorage.getItem("email");

    const navigate = useNavigate();


    const initialValues = {
        name: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
        activeStatus: "",
        metabolismType: "",
        constraints: "",
    };

    const onSubmit = (data) => {
        axios.get(`http://localhost:3001/authentication/${email}`).then((response) => {
            data.userId = response.data;
            console.log(response.data);
            axios.post("http://localhost:3001/profiles", data, {
                headers: {
                    token: sessionStorage.getItem("token")
                }
            }
            
            ).then((response) => {
                console.log(response.data);
                navigate("/");
                // if(response.data.error) {
                //     alert(response.data.error);
                // }else {
                //     console.log(response);
                // }
              });
        });


    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        age: Yup.number().required(),
        gender: Yup.string().required(),
        height: Yup.number().required(),
        weight: Yup.number().required(),
        activeStatus: Yup.string().required(),
        metabolismType: Yup.string().required(),

    });

  return (
    <div className='App'>
<div className='createProfilePage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
                <label>Your Name: </label>
                <ErrorMessage name="name" component="span"/>
                <Field autoComplete="off" id="inputCreateProfile" name="name" placeholder="Example: John" />
                
                <label>Age: </label>
                <ErrorMessage name="age" component="span"/>
                <Field autoComplete="off" id="inputCreateProfile" name="age" placeholder="Example: 15" />
                
                <label>Gender: </label>
                <ErrorMessage name="gender" component="span"/>
                <Field as="select" id="inputCreateProfile" name="gender">
                    <option value="">Select your gender</option>
                    <option value="male">M</option>
                    <option value="female">F</option>
                </Field>
                
                <label>Height(cm): </label>
                <ErrorMessage name="height" component="span"/>
                <Field autoComplete="off" id="inputCreateProfile" name="height" placeholder="Example: 170" />
                
                <label>Weight(kg): </label>
                <ErrorMessage name="weight" component="span"/>
                <Field autoComplete="off" id="inputCreateProfile" name="weight" placeholder="Example: 73" />

                <label>Activity Status: </label>
                <ErrorMessage name="activeStatus" component="span"/>
                <Field as="select" id="inputCreateProfile" name="activeStatus">
                    <option value="">Select an activity status</option>
                    <option value="less">Less</option>
                    <option value="weekly">Weekly</option>
                    <option value="2-3/week">2-3/week</option>
                    <option value="4-5/week">4-5/week</option>
                    <option value="daily">Daily</option>
                    <option value="performance">Performance</option>
                </Field>

                <label>Metabolism Type: </label>
                <ErrorMessage name="metabolismType" component="span"/>
                <Field as="select" id="inputCreateProfile" name="metabolismType">
                    <option value="">Select a metabolism type</option>
                    <option value="endomorph">Endomorph</option>
                    <option value="mezomorph">Mezomorph</option>
                    <option value="ectomorph">Ectomorph</option>
                </Field>
                
                <label>Special Requests(Type any number of requests:(vegan, vegetarian, lactose-free, peanuts-free, glucose-free)): </label>
                <ErrorMessage name="constraints" component="span"/>
                <Field autoComplete="off" id="inputCreateProfile" name="constraints" placeholder="Example: vegan, glucose-free" />
                
                
                <button type="submit">Create Profile</button>
            </Form>
        </Formik>
    </div>
    </div>
    
  )
}

export default CreateProfile
