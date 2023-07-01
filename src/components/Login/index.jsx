import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { appContext } from "./../../AppContext";
export function Login(props) {
  const navigate = useNavigate();
  const { setUser } = useContext(appContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const URL = process.env.REACT_APP_SERVER_URL;
  const login = () => {
    axios
      .post(`${URL}/login`, {
        email: email,
        password: password,
        remember: true,
      })
      .then((res) => {
        window.sessionStorage.setItem("token", res.data.token);
        setUser(window.sessionStorage.getItem("token"));

        navigate("/");
      })
      .catch((err) => {
        setError(`Login Failed!! ${err}`);
      });
  };
  return (
    <div className='Auth-form-container'>
      <form className='Auth-form'>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-title'>Sign In</h3>
          <div className='form-group mt-3'>
            <label>Email address</label>
            <input
              type='email'
              className='form-control mt-1'
              placeholder='Enter email'
              onChange={(e) => {
                setError(null);
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className='form-group mt-3'>
            <label>Password</label>
            <input
              type='password'
              className='form-control mt-1'
              placeholder='Enter password'
              onChange={(e) => {
                setError(null);
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className='d-grid gap-2 mt-3'>
            <button
              onClick={(e) => {
                e.preventDefault();
                login();
              }}
              type='submit'
              className='btn btn-primary'
            >
              Login
            </button>
          </div>
          {error && <div className='text-danger'>{error}</div>}
          <p className='forgot-password text-right mt-2'>
            Forgot <a href='#'>password?</a>
          </p>

          <Link to='/register'>
            <p className='text-right mt-2'>Create Account</p>
          </Link>
        </div>
      </form>
    </div>
  );
}
