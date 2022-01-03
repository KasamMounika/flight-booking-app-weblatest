import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import './Login.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();
  toast.configure();
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  }

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  }

  const validateUser=(event) => {
    event.preventDefault();
   console.log(username);
   console.log(password);
   if(username==='' || password===''){
    toast.warning('Input data is missing,please provide.', {
      position: toast.POSITION.TOP_CENTER, autoClose:3000});
     return;
   }
    const axios = require('axios');
    axios.post('http://localhost:8081/authenticate',{username:username,
              password:password})
        .then(res=>{
          console.log(res.data);
          if(res.data!=null){
            if(res.data.jwttoken==='user'){
              history.push("/loggeduserHome");
            }else{
          history.push("/loggedAdminhome");
            }
          }
      }).catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          if(error.response.status===401 || error.response.status===404){
            toast.warning('Authentication failed.Please try again.', {
              position: toast.POSITION.TOP_CENTER, autoClose:3000});
          }
        }});
        setUsername('');
        setPassword('');
  }
  return (
    <form>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Username</label>
          <input
            type='text'
            value={username}
            onChange={usernameChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={passwordChangeHandler}
          />
        </div>
        </div>
      <div>
        <button type='submit' className='new-expense__actions' onClick={validateUser}>Login</button>
      </div>
     
    </form>
  );
};

export default LoginForm;