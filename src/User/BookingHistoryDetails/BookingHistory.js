import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserMenu  from '../UserMenu';
import {useHistory} from 'react-router-dom';

const BookingHistory = () => {
  const [email, setEmail] = useState('');
  const [bookingDetails, setBookingDetails] = useState([]);
  let history = useHistory();
  toast.configure();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const getDetails = (event) => {
    event.preventDefault();
    console.log(email);
    if(email===''){
      toast.warning('Please enter input!', {
        position: toast.POSITION.TOP_CENTER, autoClose:3000});
        return;
    }
      const axios = require('axios');
      const config = { headers: {'Content-Type': 'application/json'} };
      axios.get('http://localhost:8082/api/v1.0/flight/tickets/'+email,
    config).then(res=>{
            console.log(res.data);
            if(res.data.length>0 && res.data!=null){
                setBookingDetails(res.data);
            }else if(res.data.length===0){
              toast.warning('No records found.Please enter input again!', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000});
            }
        }).catch(error => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            if(error.response.status===400){
              toast.warning('Please enter valid input!', {
                position: toast.POSITION.TOP_CENTER, autoClose:3000});
            }
          }});
      setEmail('');
  };

  const viewTicket = (event,i)=>{
     history.push({
        pathname:  "/viewTicket",
        search: ""+i
     });
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
          <label>Search By emailID</label>
          <div className='new-expense__control'>
          <input
            type='text'
            value={email}
            onChange={emailChangeHandler}
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
                <th>age</th>
                <th>From place</th> 
                <th>To place</th> 
                <th>Date</th> 
                <th>Number of seats booked</th> 
                <th>Action</th>
            </tr>
            {bookingDetails.map((bookingDetail, index) => (  
              <tr data-index={index}>  
                <td className='tdStyleEditAirline'>{bookingDetail.flight_Number}</td>  
                <td className='tdStyleEditAirline'>{bookingDetail.name}</td>  
                <td className='tdStyleEditAirline'>{bookingDetail.age}</td>
                <td className='tdStyleEditAirline'>{bookingDetail.from_Place}</td> 
                <td className='tdStyleEditAirline'>{bookingDetail.to_Place}</td> 
                <td className='tdStyleEditAirline'>{bookingDetail.date}</td> 
                <td className='tdStyleEditAirline'>{bookingDetail.no_Of_Seats_To_Book}</td> 
                <td className='tdStyleEditAirline'><button type='submit' onClick= {(event) => viewTicket(event,bookingDetail.pnr)} className='new-expense-bookFlightDiscount__actions'>View</button></td>
              </tr>  
         ))}
    </table>
    </div>
  );
};

export default BookingHistory;