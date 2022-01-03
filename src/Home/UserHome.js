import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import './Home.css';

const UserHome = () => {
  let history = useHistory();
  const[btn_class,setBtn_class] = useState('button');
  const[btn_classClick,setBtn_classClick] = useState('button');
  const[button_Index,setButton_Index] = useState(0);


  const clickedHome = (event) => {
    event.preventDefault();
    console.log('clicked Home');
    setBtn_class("button_selected");
    setButton_Index(event.currentTarget.id);
    console.log(button_Index);
    history.push("/userHome");
    
  }

  const bookFlightClicked = () => {
    console.log('clicked Book Flight');
    history.push("/bookFlight");
  }

  const manageBookingClicked = () => {
    console.log('clicked manage booking');
    history.push("/cancelBooking");
  }

  const BookingHistoryClicked = () => {
    console.log('clicked booking history');
    history.push("/bookingHistory");
  }

  const clickedUser = (event) => {
    event.preventDefault();
    console.log('clicked User');
    setBtn_class("button_selected");
    setButton_Index(event.currentTarget.id);
    console.log(button_Index);
    history.push("/userMain");
  }
  return (
    <div>
    <div className="bs-example-align">
    <button type='submit' className='button_userMenu' onClick={bookFlightClicked}>Book Flight</button>
        <button type='submit' className='button_userMenu' onClick={manageBookingClicked}>Manage Bookings</button>
        <button type='submit' className='button_userMenu' onClick={BookingHistoryClicked}>Booking History</button>
    </div>
    </div>
  );
};

export default UserHome;