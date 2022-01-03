import React, { Component} from 'react';
import './ViewTicket.css';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';

class ViewTicket extends Component {

  constructor(props){
    super(props);
    this.state = {bookingDetail:''};
    this.downloadTicket = this.downloadTicket.bind(this);
  }

  componentDidMount(){
    console.log('pnr ',((this.props.location.search).charAt(this.props.location.search.length-1)));
      const axios = require('axios');
      const config = { headers: {'Content-Type': 'application/json'} };
      axios.get('http://localhost:8082/api/v1.0/flight/ticket/'+((this.props.location.search).charAt(this.props.location.search.length-1)),
    config).then(res=>{
            console.log(res.data);
            if(res.data!=null){
                this.setState({bookingDetail:res.data});
            }
        }).catch(error => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }});
  }

 downloadTicket(){
    const pdfTable = document.getElementById('divToPrint');
    const pdf = new jsPDF();
    if (pdf) {
      domtoimage.toPng(pdfTable)
        .then(imgData => {
          pdf.addImage(imgData, 'PNG', -30, 10);
          pdf.save('E-Ticket.pdf');
        });
    }
  }

  render() {
    return (
      <div>
      <div id="divToPrint">
        <div className='headingStyleViewTicket'>E-TICKET</div>
       <table className='tableCenterViewTicket'>  
            <tr className='trStyleViewTicket'>  
                <td>PNR</td>
                <td className='tdStyleViewTicket'>{this.state.bookingDetail.pnr}</td>
            </tr>  
            <tr className='trStyleViewTicket'>
                <td>Flight Number</td>
                <td className='tdStyleViewTicket'>{this.state.bookingDetail.flight_Number}</td>
            </tr>
            <tr className='trStyleViewTicket'>
                <td>Name</td>
                <td className='tdStyleViewTicket'>{this.state.bookingDetail.name}</td>
            </tr>
            <tr className='trStyleViewTicket'>
                <td>Age</td>
                <td className='tdStyleViewTicket'>{this.state.bookingDetail.age}</td>
            </tr>
            <tr className='trStyleViewTicket'>
                <td>From place</td>
                <td className='tdStyleViewTicket'>{this.state.bookingDetail.from_Place}</td>
            </tr>
            <tr className='trStyleViewTicket'>  
                <td>To place</td>
                <td className='tdStyleViewTicket'>{this.state.bookingDetail.to_Place}</td>
            </tr>
            <tr className='trStyleViewTicket'> 
                <td>Date</td>
                <td className='tdStyleViewTicket'>{this.state.bookingDetail.date}</td>
            </tr>
            <tr className='trStyleViewTicket'>
                <td>Number of seats booked</td>
                <td className='tdStyleViewTicket'>{this.state.bookingDetail.no_Of_Seats_To_Book}</td>
            </tr>
        </table>
      </div>
      <div className='padding-viewTicket_style'>
      <button type='submit' onClick= {this.downloadTicket} className='new-expense-viewTicket__actions'>Download</button>
      </div>
      </div>
    );
  }
}

export default ViewTicket;