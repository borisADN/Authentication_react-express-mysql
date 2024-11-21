import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";

import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleInput = e => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    setErrors(Validation(values));
    if (Object.keys(errors).length === 0) {
      axios
        .post("http://localhost:8081/login", values)
        .then(res => {
          // console.log(res);
          if (res.data=== "success") {
            navigate("/home");
          } else {
            // navigate("/home")
            alert("invalid credentials");
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2 className="text-center">Connectez-vous</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            <p className="text-danger">
              {errors.email}
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            <p className="text-danger">
              {errors.password}
            </p>
          </div>
          <button type="submit" className="btn btn-success w-100">
            <strong>Login</strong>
          </button>
          <p>You agree to our Terms and condition</p>
          <Link
            to="/signup"
            className="btn btn-default border w-100 bg-light text-decoration-none"
          >
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
