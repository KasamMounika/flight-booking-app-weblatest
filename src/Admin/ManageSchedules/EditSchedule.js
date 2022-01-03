import React, { Component } from 'react';
import AdminMenu from '../AdminMenu';
import './EditSchedule.css';
import ToggleButton from 'react-toggle-button';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class EditSchedule extends Component {

  constructor(props){
    super(props);
    this.state = {airlines:[]};
    this.handleStatus = this.handleStatus.bind(this);
  }

  handleStatus(i,a){
    toast.configure();
    const axios = require('axios');
    const config = { headers: {'Content-Type': 'text/plain'} };
    axios.put('http://localhost:8082/api/v1.0/flight/updateFlightStatus/'+i,a,config)
    .then(res=>{
      console.log(res.data);
      window.location.reload();
      toast.success('AirLine status updated successfully', {
        position: toast.POSITION.TOP_CENTER, autoClose:3000});
    }).catch(error=>{
      console.error('Error',error);
    })
  }

  componentDidMount(){
    const axios = require('axios');
    axios.get('http://localhost:8082/api/v1.0/getAllAirLines')
    .then(res=>{
      console.log(res.data);
      this.setState({airlines:res.data});
    }).catch(error=>{
      console.error('Error',error);
    })
  }

  render() {
    return (
      <div>
          <AdminMenu></AdminMenu>
       <table className='tableCenterEditAirline'>  
            <tr className='trStyleEditAirline'>  
                <th>Flight Number</th>  
                <th>Airline</th>
                <th>From place</th> 
                <th>To place</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Scheduled days</th>
                <th>Round Trip provided</th>
                <th>Status</th>
            </tr>
            {this.state.airlines.map((airline, index) => (  
              <tr data-index={index}>  
                <td className='tdStyleEditAirline'>{airline.airLine_Number}</td>  
                <td className='tdStyleEditAirline'>{airline.airLine_Name}</td>  
                <td className='tdStyleEditAirline'>{airline.from_Place}</td>  
                <td className='tdStyleEditAirline'>{airline.to_Place}</td>
                <td className='tdStyleEditAirline'>{airline.start_Date}</td>  
                <td className='tdStyleEditAirline'>{airline.end_Date}</td>
                <td className='tdStyleEditAirline'>{airline.scheduled_Days}</td>
                <td className='tdStyleEditAirline'>{airline.roundTrip_provided}</td>
                <td className='tdStyleEditAirline'>
                <ToggleButton
                value={airline.airLine_Status==='A'?true: false}
                 onToggle={(index) => {
                     this.handleStatus(airline.airLine_Number,airline.airLine_Status);
                   }} 
                />
                </td>
              </tr>  
            ))}
        </table>
      </div>
    );
  }
}

export default EditSchedule;