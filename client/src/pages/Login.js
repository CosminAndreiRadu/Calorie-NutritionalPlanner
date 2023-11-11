import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    const login = () => {
        const account ={ email: email, password: password}

        axios.post('http://localhost:3001/authentication/login', account).then((response) => {
          if(response.data.error) {
            alert(response.data.error);
          }else {
            sessionStorage.setItem("token", response.data); 
            sessionStorage.setItem("email", account.email); 

            axios.get(`http://localhost:3001/authentication/${account.email}`).then((response) => {
            const id = response.data;
              axios.get(`http://localhost:3001/profiles/${id}`).then((response) => {
                console.log(response.data);
                if(!response.data) {
                  window.location.href = "/createProfile";
                }else {
                  window.location.href = "/";
                }
              });
            });
          }
      })
    }

    const logout = () => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("email");
      window.location.href = "/login";
    

      
    }

  return (
    <div className='loginContainer'>
      <label className="loginLabel">Email:</label>
      <input  className="loginInput" type="text" onChange={(event) =>{
        setEmail(event.target.value);
      }}>
      </input>
      <label className="loginLabel">Password:</label>

      <input  className="loginInput" type="password"
        onChange={(event) => {
            setPassword(event.target.value);
        }}
      ></input>
      <button className='loginButton' onClick={login}>Login</button>
      <button className='notYetButton' onClick={() => {navigate(`/register`)}}>Not Signed in yet? Create Account</button>
      <button className='logoutButton' onClick={logout}>LogOut</button>

    </div>
  )
}

export default Login
