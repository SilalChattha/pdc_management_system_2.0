import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

export default function NewSignup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [priv, setPriv] = useState(false);
  const [name, setName] = useState("");

  Axios.defaults.withCredentials = true;

  const handleOnSignUp = (event) => {
    if (name === password) {
      return <h1>Please enter a valid name</h1>;
    }
    Axios.post("http://localhost:3001/register", {
      email: email,
      password: password,
      priv: priv,
      name: name,
    })
      .then((response) => {
        //check if the response is an error message
        //if error message, then display the error message
        if (response.data.message === "Please fill all the fields") {
          alert("Please fill all the fields");
        } else {
          //else redirect the user to the login page
          alert(
            "You have successfully registered. Now Please Log in with your details"
          );
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  };

  return (
    <div className="signup bg-dark f">
      <div className="linklogin  text-center link-danger ">
        <Link className="text-danger" to="/login">
          Login
        </Link>
      </div>
      <h1>SignUp</h1>
      <div className="signupform text-center">
        <div className="name text-center my-2">
          <label htmlFor="name" className="text-white">
            Name:{" "}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="email text-center my-2">
          <label htmlFor="email" className="text-white">
            Email:{" "}
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="password text-center my-2">
          <label
            htmlFor="password"
            className="password text-white font-weight-light"
          >
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <label htmlFor="privilige" className="priv text-white mx-auto">
          Are you a Staff Member?
        </label>
        <input
          type="checkbox"
          name="privilige"
          checked={priv}
          onChange={(e) => {
            setPriv(e.target.checked);

            //handle checkbox value in form
          }}
        />
        <button className="btn btn-primary mx-auto" onClick={handleOnSignUp}>
          Signup
        </button>
      </div>
    </div>
  );
}
