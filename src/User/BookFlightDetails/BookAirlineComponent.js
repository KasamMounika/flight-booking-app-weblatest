import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory} from 'react-router-dom';

const BookAirlineComponent = () => {
  const [username, setUsername] = useState('');
  const [emailId, setEmailId] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [age, setAge] = useState('');
  const [seats, setSeats] = useState('');
  const [mealType, setMealType] = useState('None');
  const [gender, setGender] = useState('Male');
  const [seatTypeSelected, setSeatTypeSelected] = useState('Business class');
  let history = useHistory();
  toast.configure();

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const emailIdChangeHandler = (event) => {
    setEmailId(event.target.value);
  };

  const genderChangeHandler = (event) => {
    const index = event.target.selectedIndex;
  const el = event.target.childNodes[index];
  const option =  el.outerText;
  setGender(option);
  };

  const ageChangeHandler = (event) => {
  setAge(event.target.value);
  };

  const seatTypeChangeHandler = (event) => {
    const index = event.target.selectedIndex;
  const el = event.target.childNodes[index];
  const option =  el.outerText;
  setSeatTypeSelected(option);
  };

  const flightNumberChangeHandler = (event) => {
    setFlightNumber(event.target.value);
  };

  const seatsChangeHandler = (event) => {
    setSeats(event.target.value);
  };

  const mealTypeChangeHandler = (event) => {
    const index = event.target.selectedIndex;
  const el = event.target.childNodes[index];
  const option =  el.outerText;
  setMealType(option);
  };


  const submitHandler = (event) => {
    event.preventDefault();
    console.log(username+''
      +emailId+''
      +flightNumber+''
      +age+''
      +seats+''
      +mealType+''
      +gender+''
      +seatTypeSelected);

      const axios = require('axios');
      axios.post('http://localhost:8082/api/v1.0/flight/booking',{name:username,
      emailID:emailId,
      flightNumber:flightNumber,
      age:age,
      noOfSeatsToBook:seats,
      mealType:mealType,
      gender :gender,
      seatTypeSelected :seatTypeSelected})
          .then(res=>{
            console.log(res.data);
            if(window.confirm('Ticket booked successfully with PNR '+res.data)){
                history.push("/bookFlight");
                return;
               }else{
                 return;
               }
        }).catch(error => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            if(error.response.data==='600'){
              toast.warning('Number of seats exceeded.Please reduce.', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000});
                return;
            }
            if(error.response.status===400){
              toast.warning('Please enter valid input', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000});
                return;
            }
            if(error.response.status===400 && error.response.data==='400'){
              toast.warning('Please enter valid input', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000});
                return;
            }if(error.response.data==='603'){
              toast.warning('Please enter valid email', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000});
                return;
            }
          }});
  setUsername('');
  setEmailId('');
  setFlightNumber('');
  setAge('');
  setSeats('');
  };

  return (
    <div>
        <div className='headingStyleBookFlight'>FLIGHT BOOKING FORM</div>
    <form onSubmit={submitHandler}>
      <table className='table.center'>
        <tr>
        <div className='new-expense-addAirline__controls'>
          <td className='tdStyle'>
        <div className='new-expense-addAirline__control' >
          <label>Name</label>
          <input
            type='text'
            value={username}  
            onChange={usernameChangeHandler}
          />
        </div>
        </td>
        <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>Email Id</label>
          <input
            type='text'
            value={emailId}
            onChange={emailIdChangeHandler}
          />
        </div>
        </td>
        <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>Flight Number</label>
          <input
            type='text'
            value={flightNumber}
            onChange={flightNumberChangeHandler}
          />
        </div>
        </td>
        <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>Age</label>
          <input
            type='text'
            value={age}
            onChange={ageChangeHandler}
          />
        </div>
        </td>
        </div>
        </tr>
        <tr>
        <div className='new-expense-addAirline__controls'>
        <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>Gender</label>
          <select className='selectStyle'  id='gender' 
            onChange={genderChangeHandler}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          </select>
        </div>
        </td> 
        <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>Number of seats</label>
          <input
            type='text'
            value={seats}
            onChange={seatsChangeHandler}
          />
        </div>
        </td>
        <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>Seat Type selected</label>
          <select className='selectStyle'  id='seatType' 
            onChange={seatTypeChangeHandler}>
          <option value="BC">Business Class</option>
          <option value="NBC">Non Business Class</option>
          </select>
        </div>
        </td> 
        <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>Meal</label>
          <select className='selectStyle'  id='meal' 
            onChange={mealTypeChangeHandler}>
          <option value="None">None</option>
          <option value="Veg">Veg</option>
          <option value="Non Veg">Non Veg</option>
          </select>
        </div>
        </td> 
        </div>
        </tr>
        </table>
       <div>
        <button type='submit' className='new-expense-addAirline__actions'>Submit</button>
      </div>
    </form>
    </div>
  );
};

export default BookAirlineComponent;