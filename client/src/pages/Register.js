import React from 'react'
import axios from "axios";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';


function Register() {

  const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
    };

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/authentication", data).then(() => {
            console.log(data);
            navigate("/login")
        });
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required(),
        password: Yup.string().min(8).max(25).required()
    });

  return (
    
    <div className="registerPage">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
            <label>E-mail: </label>
            <ErrorMessage name="email" component="span"/>
            <Field autoComplete="off" id="inputRegister" name="email" placeholder="Example: mail@mail.com" />

            <label>Password: </label>
            <ErrorMessage name="password" component="span"/>
            <Field type="password" autoComplete="off" id="inputRegister" name="password" placeholder="Example: pass1234" />

            <button type="submit">Register</button>

            <button className='notYetButton' onClick={() => {navigate(`/login`)}}>Already have an account? Sign In</button>

        </Form>
        
       </Formik>

    </div>
  )
}

export default Register
