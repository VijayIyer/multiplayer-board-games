import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { appContext } from "./../../AppContext";
export function Login(props) {
  const navigate = useNavigate();
  const { user, setUser, userName, setUserName } = useContext(appContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const login = () => {
    console.log(`email: ${email}, password:${password}`);
    axios
      .post("http://127.0.0.1:5000/login", {
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
        console.log(`login failed!! : \n ${JSON.stringify(err)}`);
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
                setEmail(e.target.value);
                console.log(email);
                console.log(password);
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
                setPassword(e.target.value);
                console.log(email);
                console.log(password);
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
          <p className='forgot-password text-right mt-2'>
            Forgot <a href='#'>password?</a>
          </p>
          <p className='text-right mt-2'>
            <a href='/register'>Create Account</a>
          </p>
        </div>
      </form>
    </div>
  );
}
