import React from "react";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";
import Profile from "./Profile";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [priv, setPriv] = useState(false);
  const handleOnLogin = (event) => {
    //add server code for login post request and authenticate the user
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
      priv: priv,
      // navigate("/login");
    })
      .then((response) => {
        // console.log(response.data.user);

        navigate("/profile");
        // navigate("/profile", { state: response });
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  };
  return (
    <>
      <h3>Login</h3>
      <div class=".form-control-plaintext row align-item-center justify-content-center">
        <div className=" row my-3">
          <label for="staticEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-5 p-2">
            <input
              type="email"
              value={email}
              className="form-control-plaintext "
              id="staticEmail"
              placeholder="email@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-5  p-2">
            <input
              type="password"
              value={password}
              className="form-control"
              id="inputPassword"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button className="btn btn-primary mx-3" onClick={handleOnLogin}>
        Login
      </button>
      <form>
        <label htmlFor="privilige">Are you a Staff Member?</label>
        <input
          type="checkbox"
          name="privilige"
          checked={priv}
          onChange={(e) => {
            setPriv(e.target.checked);

            //handle checkbox value in form
          }}
        />
      </form>
    </>
  );
}
