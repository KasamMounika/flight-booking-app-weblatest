import React, { Component } from 'react';
import AdminMenu from '../AdminMenu';
import './AddDiscount.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddDiscount extends Component {               

  constructor(props){
    super(props);
    this.discountCodeChangeHandler = this.discountCodeChangeHandler.bind(this);
    this.discountOfferedChangeHandler = this.discountOfferedChangeHandler.bind(this);
    this.submitDiscountHandler = this.submitDiscountHandler.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {airlines:[]};
    toast.configure();
  }

  discountCodeChangeHandler=(e)=>{
    this.setState({discountCode:e.target.value});
    console.log('hello',this.state.discountCode);
  }

  discountOfferedChangeHandler=(e)=>{
    this.setState({discountOffered:e.target.value});
    console.log('hello offered',this.state.discountOffered);
  }

  submitDiscountHandler = (e) => {
  const axios = require('axios');
    axios.post('http://localhost:8082/api/v1.0/create/discountDetails',{flight_Number:this.state.flightNumber,
    discount_Code:this.state.discountCode,discount_Offered:this.state.discountOffered})
        .then(res=>{
          console.log(res.data);
          if(res.data===200){
            toast.success('Discount added successfully', {
              position: toast.POSITION.TOP_CENTER, autoClose:3000});
          }
      }).catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          if(error.response.data===400 ){
            toast.warning('Please enter correct input', {
              position: toast.POSITION.TOP_CENTER, autoClose:3000});
          }
          if(error.response.data===600){
            alert('Discount code is already present.Please enter a different one!')
            // toast.warning('', {
            //   position: toast.POSITION.TOP_CENTER, autoClose:3000});
          }
        }});
        alert('Discount added successfully and please recheck if any discrepancies are found!');
}

onValueChange(event) {
    toast.warn('Please make sure to enter discount details', {
        position: toast.POSITION.TOP_CENTER, autoClose:3000});
    this.setState({flightNumber:event.target.value});
    console.log(this.state.flightNumber);
    return;
  }

  componentDidMount(){
    const axios = require('axios');
    axios.get('http://localhost:8082/api/v1.0/getAllAirLinesForDiscount')
    .then(res=>{
      console.log(res.data);
      this.setState({airlines:res.data});
    }).catch(error=>{
      console.error('Error',error);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    })
  }

  

  render() {
    return (
      <div>
          <AdminMenu></AdminMenu>
          <form onSubmit={this.submitDiscountHandler}>
       <table className='tableCenterAddDiscount'>  
            <tr className='trStyleAddDiscount'> 
               <th>Select</th>   
                <th>Flight Number</th>  
                <th>Airline</th>
                 <th>Discount Code</th>  
                <th>Discount Offered</th>
                <th>Action</th>
            </tr>
            {this.state.airlines.map((airline, index) => (  
              <tr data-index={index}>  
                 <td className='tdStyleAddDiscount'><input
              type="radio" name="selectedDiscount"
              value={airline.airLine_Number} onChange={this.onValueChange}
            /></td> 
                <td className='tdStyleAddDiscount'>{airline.airLine_Number}</td>  
                <td className='tdStyleAddDiscount'>{airline.airLine_Name}</td>
                 <td className='tdStyleAddDiscountDiv'><input type='text'   onChange={this.discountCodeChangeHandler}></input></td>
                <td className='tdStyleAddDiscountDiv'><input type='text'  onChange={this.discountOfferedChangeHandler}></input></td>
                <td> <button type='submit' className='new-expense-addDiscount__actions'>Apply Discount</button></td>
              </tr> 
            ))}
        </table>
        </form>
      </div>
    );
  }
}

export default AddDiscount;