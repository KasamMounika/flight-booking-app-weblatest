import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import AdminMenu from '../AdminMenu';
import './AddAirlines.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAirline = () => {
  const [airLineNumber, setAirLineNumber] = useState('');
  const [airLineName, setAirLineName] = useState('');
  const [fromPlace, setFromPlace] = useState('Hyderabad');
  const [toPlace, setToPlace] = useState('Hyderabad');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [scheduledDays, setScheduledDays] = useState('Daily');
  const [instrumentUsed, setInstrumentUsed] = useState('');
  const [businessClassSeats, setBusinessClassSeats] = useState('');
  const [nonBusinessClassSeats, setNonBusinessClassSeats] = useState('');
  const [airLinePrice, setAirLinePrice] = useState('');
  const [totalRows, setTotalRows] = useState('');
  const [mealType, setMealType] = useState('None');
  const [contactNumber, setContactNumber] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [roundTripProvided, setRoundTripProvided] = useState('Yes');

  toast.configure();

  const airLineNumberChangeHandler = (event) => {
    setAirLineNumber(event.target.value);
  };

  const airLineNameChangeHandler = (event) => {
    setAirLineName(event.target.value);
  };

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

  const scheduledDaysChangeHandler = (event) => {
    const index = event.target.selectedIndex;
  const el = event.target.childNodes[index];
  const option =  el.outerText;
    setScheduledDays(option);
  };

  const startDateChangeHandler = (event) => {
    setStartDate(event.target.value);
  };

  const endDateChangeHandler = (event) => {
    setEndDate(event.target.value);
  };

  const instrumentUsedChangeHandler = (event) => {
    setInstrumentUsed(event.target.value);
  };

  const airLinePriceChangeHandler = (event) => {
    setAirLinePrice(event.target.value);
  };

  const mealTypeChangeHandler = (event) => {
    const index = event.target.selectedIndex;
  const el = event.target.childNodes[index];
  const option =  el.outerText;
  setMealType(option);
  };

  const businessClassSeatsChangeHandler = (event) => {
    setBusinessClassSeats(event.target.value);
  };

  const nonBusinessClassSeatsChangeHandler = (event) => {
    setNonBusinessClassSeats(event.target.value);
  };

  const totalRowsChangeHandler = (event) => {
    setTotalRows(event.target.value);
  };

  const contactNumberChangeHandler = (event) => {
    setContactNumber(event.target.value);
  };

  const contactAddressChangeHandler = (event) => {
    setContactAddress(event.target.value);
  };

  const roundTripProvidedChangeHandler = (event) => {
    const index = event.target.selectedIndex;
  const el = event.target.childNodes[index];
  const option =  el.outerText;
    setRoundTripProvided(option);
  };


  const submitHandler = (event) => {
    event.preventDefault();
    console.log(airLineNumber+''
      +airLineName+''
      +fromPlace+''
      +toPlace+''
      +startDate+''
      +endDate+''
      +scheduledDays+''
      +instrumentUsed+''
      +businessClassSeats+''
      +nonBusinessClassSeats+''
      +airLinePrice+''
      +totalRows+''
      +mealType+''
      +contactNumber+''
      +contactAddress+''
      +roundTripProvided);

      const axios = require('axios');
      axios.post('http://localhost:8082/api/v1.0/create/airlines',{airLineNumber:airLineNumber,
      airLineName:airLineName,
      fromPlace:fromPlace,
      toPlace:toPlace,
      startDate:startDate,
      endDate:endDate,
      scheduledDays :scheduledDays,
      instrumentUsed :instrumentUsed,
      businessClassSeats: businessClassSeats,
      nonBusinessClassSeats :nonBusinessClassSeats,
      airLinePrice: airLinePrice,
      totalRows: totalRows,
      mealType: mealType,
      contactNumber: contactNumber,
      contactAddress: contactAddress,
      roundTripProvided: roundTripProvided})
          .then(res=>{
            console.log(res.data);
            if(res.data!=null){
              toast.success('AirLine added successfully', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000});
            }
        }).catch(error => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            if(error.response.status===400 ){
              toast.warning('Please enter correct input', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000});
                return;
            }
            if(error.response.status===400 && error.response.data==='400'){
              toast.warning('Input data is missing.Please enter!', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000});
                return;
            }if(error.response.data==='600'){
              toast.warning('Source and destination locations are same.Please reenter!', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000});
                return;
            }
            if(error.response.data==='601'){
              toast.warning('Please enter proper date(s)!', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000});
                return;
            }
            if(error.response.data==='602'){
              toast.warning('Please enter valid phone number!', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000});
                return;
            }
            if(error.response.data==='603'){
              toast.warning('Please enter valid email!', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000});
                return;
            }
            if(error.response.data==='604'){
              toast.warning('Number of seats are limited to 100', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000});
                return;
            }
            if(error.response.data==='605'){
              toast.warning('Number of rows are limited to 10', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000});
                return;
            }
          }});
      setAirLineNumber('');
      setAirLineName('');
      setStartDate('');
      setEndDate('');
      setInstrumentUsed('');
      setBusinessClassSeats('');
      setNonBusinessClassSeats('');
      setAirLinePrice('');
      setTotalRows('');
      setContactNumber('');
      setContactAddress('');
  };

  return (
    <div>
    <AdminMenu></AdminMenu>
    <form onSubmit={submitHandler}>
      <table className='table.center'>
        <tr>
        <div className='new-expense-addAirline__controls'>
          <td className='tdStyle'>
        <div className='new-expense-addAirline__control' >
          <label>Flight Number</label>
          <input
            type='text'
            value={airLineNumber}  
            onChange={airLineNumberChangeHandler}
          />
        </div>
        </td>
        <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>Airline</label>
          <input
            type='text'
            value={airLineName}
            onChange={airLineNameChangeHandler}
          />
        </div>
        </td>
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
          <label>Scheduled days</label>
          <select className='selectStyle' id='schdays' onChange={scheduledDaysChangeHandler}>
          <option value="Daily">Daily</option>
          <option value="Week Days">Week Days</option>
          <option  value="Week Ends">Week Ends</option>
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
        </div>
        </tr>
        <tr>
        <div className='new-expense-addAirline__controls'>
        <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>Start date</label>
          <div className='new-expense__control'>
          <input type='date'  className='datepickerStyle' value={startDate} onChange={startDateChangeHandler}/>
        </div>
        </div>
        </td> 
        <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>End date</label>
          <div className='new-expense__control'>
          <input type='date'  className='datepickerStyle' value={endDate} onChange={endDateChangeHandler}/>
        </div>
        </div>
        </td>
        <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>Instrument used</label>
          <input
            type='text'
            value={instrumentUsed}
            onChange={instrumentUsedChangeHandler}
          />
        </div>
        </td>
        <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>Ticket cost</label>
          <input
            type='text'
            value={airLinePrice}
            onChange={airLinePriceChangeHandler}
          />
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
        <tr>
        <div className='new-expense-addAirline__controls'>
        <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>Business class seats</label>
          <input
            type='text'
            value={businessClassSeats}
            onChange={businessClassSeatsChangeHandler}
          />
        </div>
        </td>
        <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>Non Business class seats</label>
          <input
            type='text'
            value={nonBusinessClassSeats}
            onChange={nonBusinessClassSeatsChangeHandler}
          />
        </div>
        </td>
        <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>Number of rows</label>
          <input
            type='text'
            value={totalRows}
            onChange={totalRowsChangeHandler}
          />
        </div>
        </td>
        <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>Contact Number</label>
          <input
            type='text'
            value={contactNumber}
            onChange={contactNumberChangeHandler}
          />
        </div>
        </td>
        <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>Contact email address</label>
          <input
            type='text'
            value={contactAddress}
            onChange={contactAddressChangeHandler}
          />
        </div>
        </td>
        </div>
        </tr>
        </table>
       <div>
        <button type='submit' className='new-expense-addAirline__actions'>Add Airline</button>
      </div>
     
    </form>
    </div>
  );
};

export default AddAirline;