import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import styled from 'styled-components';
import "./login.css";
import FormInput from "./FormInput";

const Error = styled.span`
  color: red;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;


const Login = () => {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const [loginAttempted, setLoginAttempted] = useState(false);


  const[values, setValues] = useState({
    username: "",
    password: "",
  });


  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },

    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
   
  ];



  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, { values });
    setLoginAttempted(true);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function handleClick() {
    alert("OOPS! CAN'T CREATE ACCOUNT!!");
  }

  const spanStyle = {
    textDecoration: 'underline',
    color: 'blue',
    cursor: 'pointer'
  };

    return (
      <div id="LoginContainer">
      <form id="loginForm" onSubmit={handleSubmit}>
        <h1 id="loginTitle">LOGIN</h1>
        {inputs.map((input) => (
          <FormInput id="formInput"
            key={input.id} 
            {...input}
            value={values[input.name]}
            onChange={onChange}
          
          />
        ))}
        <button className="loginsubmitbutton" disabled={isFetching}>Submit</button>
        {loginAttempted && error && <Error>Incorrect credentials Please Try Again.</Error>}
      <p id="NoAcc" style={{marginTop: '5px', marginBottom: '10px'}}>
        Dont Have an Account??{" "}
        <span onClick={handleClick} style={spanStyle}>
          Click here
        </span>
      </p>
      </form>
      </div>
  )
}

export default Login
