import React, { useState ,useEffect} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserMenu  from '../UserMenu';

const CancelBooking = () => {
  const [pnr, setPNR] = useState('');
  const [bookingDetails, setBookingDetails] = useState('');
  const [view, setView] = useState(false);

  toast.configure();

  const pnrChangeHandler = (event) => {
    setPNR(event.target.value);
  };

  const getDetails = (event) => {
    event.preventDefault();
    console.log(pnr);
    if(pnr===''){
      toast.warning('Please enter input!', {
        position: toast.POSITION.TOP_CENTER, autoClose:3000});
    }
      const axios = require('axios');
      const config = { headers: {'Content-Type': 'application/json'} };
      axios.get('http://localhost:8082/api/v1.0/flight/ticket/'+pnr,
    config).then(res=>{
            console.log(res.data);
            if(res.data!=null){
                setBookingDetails(res.data);
                setView(true);
            }else{
              toast.warning('No records found.Please enter input again!', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000});
                setBookingDetails('');
                setView(false);
                setPNR('');
                return;
            }
        }).catch(error => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            if(error.response.status===400){
              toast.warning('Please enter valid input!', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000});
                setBookingDetails('');
                setView(false);
                setPNR('');
                return;
            }
          }});
      //setPNR('');
  };

  const cancelTicket = (event)=>{
      console.log(pnr);
      const axios = require('axios');
      const config = { headers: {'Content-Type': 'application/json'} };
      axios.delete('http://localhost:8082/api/v1.0/flight/cancel/'+pnr,
    config).then(res=>{
            console.log(res.data);
            if(res.data==='Your Flight Ticket Cancelled Successfully...'){
              toast.success('Flight Ticket cancelled successfully', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000});
                setBookingDetails('');
                setView(false);
                setPNR('');
                return;
            }
        }).catch(error => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            if(error.response.status===400){
              toast.warning('Cancellation rejected.Cancellation is only applicable prior to a day(24 hrs) before journey date', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000});
                return;
            }
          }});
     // setPNR('');
  }

  return (
    <div>
    <UserMenu></UserMenu>
    <form onSubmit={getDetails}>
      <table className='table.center'>
        <tr>
        <div className='new-expense-addAirline__controls'>
        <td className='tdStyle'>
        <div className='new-expense-addAirline__control'>
          <label>Search By PNR</label>
          <div className='new-expense__control'>
          <input
            type='text'
            value={pnr}
            onChange={pnrChangeHandler}
          />
        </div>
        </div>
        </td> 
        </div>
        </tr>
        </table>
       <div>
        <button type='submit' className='new-expense-addAirline__actions'>Submit</button>
      </div>
    </form>

    <table className='tableCenterEditAirline'>  
            <tr className='trStyleEditAirline'>  
                <th>Flight Number</th>  
                <th>Name</th>
                <th>Age</th> 
                <th>From place</th> 
                <th>To place</th> 
                <th>Date</th> 
                <th>Number of seats booked</th>
                <th>Action</th>
            </tr>
            { view ?
              <tr className='trStyleEditAirline'>  
                <td className='tdStyleEditAirline'>{bookingDetails.flight_Number}</td>  
                <td className='tdStyleEditAirline'>{bookingDetails.name}</td>  
                <td className='tdStyleEditAirline'>{bookingDetails.age}</td> 
                <td className='tdStyleEditAirline'>{bookingDetails.from_Place}</td> 
                <td className='tdStyleEditAirline'>{bookingDetails.to_Place}</td> 
                <td className='tdStyleEditAirline'>{bookingDetails.date}</td> 
                <td className='tdStyleEditAirline'>{bookingDetails.no_Of_Seats_To_Book}</td> 
                <td className='tdStyleEditAirline'><button type='submit' onClick= {(event) => cancelTicket()} className='new-expense-bookFlightDiscount__actions'>Cancel</button></td>
              </tr>  :
              null
            }
         
        </table>
    </div>
  );
};

export default CancelBooking;