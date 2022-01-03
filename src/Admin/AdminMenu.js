import React from 'react';
import {useHistory} from 'react-router-dom'
import './AdminMenu.css';

const AdminMenu = () => {

  let history = useHistory();
  const clickedManageAirlines = () => {
    console.log('clicked Manage Airlines');
    history.push("/addAirline");
  }

  const clickedManageSchedules = () => {
    console.log('clicked Manage Schedules');
    history.push("/manageSchedules");
  }

  const clickedManageDiscounts = () => {
    console.log('clicked Manage Discounts');
    history.push("/manageDiscounts");
  }

  const clickedReportAirlines = () => {
    console.log('clicked Report Airlines');
    history.push("/reportAirlines");
  }

  return (
    <div>
          <div align='center'>
        <button type='submit' className='button_adminMenu' onClick={clickedManageSchedules}>Manage Schedules</button>
      <button type='submit' className='button_adminMenu' onClick={clickedManageDiscounts}>Manage Discounts</button>
    <button type='submit' className='button_adminMenu' onClick={clickedManageAirlines}>Manage Airlines</button>
    <button type='submit' className='button_adminMenu'onClick={clickedReportAirlines}>Reports</button>
  </div>
  </div>
  );
};

export default AdminMenu;