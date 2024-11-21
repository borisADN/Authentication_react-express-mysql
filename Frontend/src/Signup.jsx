import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation'
import axios from 'axios'


const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
    })
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
const handleInput = (e) => {
    setValues(prev=>({ ...prev, [e.target.name]: e.target.value }))
}
const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(Validation(values))
    if(Object.keys(errors).length === 0){
      axios.post("http://localhost:8081/signup", values)
      .then(res => {
navigate("/")
      })
      .catch(err=> console.log(err));
    }
}

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h3 className="text-center">Inscription</h3>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              className="form-control rounded-0"
              onChange={handleInput}
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              className="form-control rounded-0"
              onChange={handleInput}
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
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
              className="form-control rounded-0"
              onChange={handleInput}
            />
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>
          <button type="submit" className="btn btn-success w-100">
            <strong>Signup</strong>
          </button>
          <p>You agree to our Terms and conditions</p>
          <Link
            to="/"
            className="btn btn-default border w-100 bg-light text-decoration-none"
          >
            <strong>Login</strong>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Signup