import React from 'react';
import './UserMenu.css';
import {useHistory} from 'react-router-dom';

const UserMain = () => {

  let history = useHistory();
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

  return (
    <div>
          <div align='center'>
        <button type='submit' className='button_userMenu' onClick={bookFlightClicked}>Book Flight</button>
        <button type='submit' className='button_userMenu' onClick={manageBookingClicked}>Manage Bookings</button>
        <button type='submit' className='button_userMenu' onClick={BookingHistoryClicked}>Booking History</button>
  </div>
  </div>
  );
};

export default UserMain;