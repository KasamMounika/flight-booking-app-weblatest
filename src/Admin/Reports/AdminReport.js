import React, { Component } from 'react';
import AdminMenu from '../AdminMenu';
import './AdminReport.css';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';

class AdminReport extends Component {

  constructor(props){
    super(props);
    this.state = {airlines:[]};
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

  downloadTicket(){
    const pdfTable = document.getElementById('divToPrint');
    const pdf = new jsPDF();
    if (pdf) {
      domtoimage.toPng(pdfTable)
        .then(imgData => {
          pdf.addImage(imgData, 'PNG',0, 0, 230, 50);
          pdf.save('AirlineReport.pdf');
        });
    }
  }

  render() {
    return (
      <div>
          <AdminMenu></AdminMenu>
       <div id='divToPrint'>
       <div className='new-expense-adminReport__control'>
         <label>Airlines Report</label>
         </div>
       <table className='tableCenterAdminReport'>  
            <tr className='trStyleAdminReport'>  
                <th>Id</th>  
                <th>Airline</th>
                <th>From place</th>  
                <th>To place</th>
                <th>Start Date</th>  
                <th>End Date</th> 
                <th>Scheduled days</th>
                <th>RoundTrip status</th>
            </tr>
            {this.state.airlines.map((airline, index) => (  
              <tr data-index={index}>  
                <td className='tdStyleAdminReport'>{airline.airLine_Number}</td>  
                <td className='tdStyleAdminReport'>{airline.airLine_Name}</td>  
                <td className='tdStyleAdminReport'>{airline.from_Place}</td>  
                <td className='tdStyleAdminReport'>{airline.to_Place}</td>
                <td className='tdStyleAdminReport'>{airline.start_Date}</td>  
                <td className='tdStyleAdminReport'>{airline.end_Date}</td>
                <td className='tdStyleAdminReport'>{airline.scheduled_Days}</td>
                <td className='tdStyleAdminReport'>{airline.roundTrip_provided}</td>
              </tr>  
            ))}
        </table>
        </div>
        <div>
        <button type='submit'  onClick= {this.downloadTicket} className='new-expense-AdminReport__actions'>Download Report</button>
        </div>
      </div>
    );
  }
}

export default AdminReport;