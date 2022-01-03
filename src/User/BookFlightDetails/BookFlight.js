import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './BookFlight.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserMenu  from '../UserMenu';
import { useHistory} from 'react-router-dom';

const BookFlight = () => {
  let history = useHistory();
  const [fromPlace, setFromPlace] = useState('Hyderabad');
  const [toPlace, setToPlace] = useState('Hyderabad');
  const [startDate, setStartDate] = useState('');
  const [roundTripProvided, setRoundTripProvided] = useState('Yes');
  const [airLines, setAirLines] = useState([]);

  toast.configure();

  const fromPlaceChangeHandler = (event) => {
  const index = event.target.selectedIndex;
  const el = event.target.childNodes[index];
  const option =  el.outerText;
    setFromPlace(option);
  };

  const toPlaceChangeHandler = (event) => {
    const index = event.target.selectedIndex;
  const el = event.target.childNodes[index];
  const option =  el.outerText;
    setToPlace(option);
  };
  
  const startDateChangeHandler = (event) => {
    setStartDate(event.target.value);
  };

  const roundTripProvidedChangeHandler = (event) => {
    const index = event.target.selectedIndex;
  const el = event.target.childNodes[index];
  const option =  el.outerText;
    setRoundTripProvided(option);
  };

  const searchHandler = (event) => {
    event.preventDefault();
    console.log(
      fromPlace+''
      +toPlace+''
      +startDate+''
      +roundTripProvided);

      const axios = require('axios');
      const config = { headers: {'Content-Type': 'application/json'} };
      axios.post('http://localhost:8082/api/v1.0/flight/userSearch',
     {
         fromPlace:fromPlace,
         toPlace:toPlace,
         startDate:startDate,
         roundTripProvided:roundTripProvided
     },config)
          .then(res=>{
            console.log(res.data);
            if(res.data.length===0){
              toast.warning('No records found.Please enter input again!', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000}); 
            }
            if(res.data!=null){
              setAirLines(res.data);
            }
        }).catch(error => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            if(error.response.status===400){
              toast.warning('No records found.Please enter input again!', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000});
            }
          }});
      setStartDate('');
  };

  const claimDiscount=(e,i)=>{
   
    const axios = require('axios');
    const config = { headers: {'Content-Type': 'application/json'} };
    axios.post('http://localhost:8082/api/v1.0/getDiscount/'+airLines[i][0],config)
        .then(res=>{
          console.log(res.data);
         if(window.confirm('Discount applied successfully and final price is reduced to '+(airLines[i][3]-res.data[0].discount_Offered)+'.Would you like to continue booking?')){
          history.push("/bookAirlineComponent");
         }else{
           return;
         }
      }).catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          if(error.response.status===404){
            toast.warning('Unable to fetch data!', {
              position: toast.POSITION.TOP_CENTER, autoClose:3000});
          }
        }});
  }

  const bookFlight=(e)=>{
      history.push("/bookAirlineComponent");
  }

  return (
    <div>
    <UserMenu></UserMenu>
    <form onSubmit={searchHandler}>
      <table className='table.center'>
        <tr>
        <div className='new-expense-addAirline__controls'>
         <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>From place</label>
          <select className='selectStyle' id='fplace' onChange={fromPlaceChangeHandler}>
  <option value="Hyderabad" selected defaultValue>Hyderabad</option>
  <option value="Chennai">Chennai</option>
  <option value="Banglore">Banglore</option>
  <option value="Mysore">Mysore</option>
</select>
        </div>
        </td>
         <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>To place</label>
          <select className='selectStyle' id='tplace' onChange={toPlaceChangeHandler}>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Chennai">Chennai</option>
          <option value="Banglore">Banglore</option>
          <option value="Mysore">Mysore</option>
          </select>
        </div>
        </td> 
        
        <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>RoundTrip provided</label>
          <select className='selectStyle'  id='roundtrip' 
            onChange={roundTripProvidedChangeHandler}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          </select>
        </div>
        </td> 
        <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>Start date</label>
          <div className='new-expense__control'>
          <input type='date'  className='datepickerStyle' value={startDate} onChange={startDateChangeHandler}/>
        </div>
        </div>
        </td> 
        </div>
        </tr>
        </table>
       <div>
        <button type='submit' className='new-expense-addAirline__actions'>Search Flight</button>
      </div>
    </form>

    <table className='tableCenterEditAirline'>  
            <tr className='trStyleEditAirline'>  
                <th>Flight Number</th>  
                <th>Airline Name</th>
                <th>Start Date</th>  
                <th>Price</th> 
                <th>Discount offered</th>
                <th>Business class seats</th>
                <th>Non Business class seats</th>
                <th>Action</th>
                <th>Discount</th>
            </tr>
            {airLines.map((airline, index) => (  
              <tr data-index={index}>  
                <td className='tdStyleEditAirline'>{airline[0]}</td>  
                <td className='tdStyleEditAirline'>{airline[1]}</td>  
                <td className='tdStyleEditAirline'>{airline[15]}</td>  
                <td className='tdStyleEditAirline'>{airline[3]}</td>
                <td className='tdStyleEditAirline'>{airline[20]}</td>
                <td className='tdStyleEditAirline'>{airline[4]}</td>
                <td className='tdStyleEditAirline'>{airline[12]}</td>
                <td className='tdStyleEditAirline'><button type='submit' onClick= {(event) => bookFlight(event)} className='new-expense-bookFlight__actions'>Book Flight</button></td>
                <td className='tdStyleEditAirline'><button type='submit' onClick= {(event) => claimDiscount(event,index)} className='new-expense-bookFlightDiscount__actions'>Claim Discount</button></td>
              </tr>  
            ))}
        </table>
    </div>
  );
};

export default BookFlight;