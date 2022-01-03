import React from "react";
import flight from './flight.jpg';
import './App.css';
import Home from './Home/Home';
import LoginForm from './Login/LoginForm';
import { Route, Switch,Link,withRouter} from "react-router-dom";
import AdminMenu from './Admin/AdminMenu';
import UserMenu from './User/UserMenu';
import AddAirline from './Admin/ManageAirlines/AddAirline';
import LoginHome from './Home/LoginHome';
import EditSchedule from './Admin/ManageSchedules/EditSchedule';
import BookFlight from './User/BookFlightDetails/BookFlight';
import UserHome from "./Home/UserHome";
import UserMain from "./User/UserMain";
import AddDiscount from "./Admin/ManageDiscounts/AddDiscount";
import AdminReport from "./Admin/Reports/AdminReport";
import BookAirlineComponent from "./User/BookFlightDetails/BookAirlineComponent";
import CancelBooking from "./User/ManageBookings/CancelBooking";
import BookingHistory from "./User/BookingHistoryDetails/BookingHistory";
import ViewTicket from "./User/BookingHistoryDetails/ViewTicket";

class App extends React.Component {
  constructor(props) {
    super(props);

    // Store the previous pathname and search strings
    this.currentPathname = null;
    this.currentSearch = null;
    this.loggedInUser = '';
    this.home='';
  }

  componentDidMount() {
    const { history } = this.props;

    if(this.props.location.pathname === "/loggedAdminhome"){
      this.loggedInUser = 'admin';
    }else if(this.props.location.pathname === "/loggeduserHome"){
      this.loggedInUser = 'user';
    }else{
      this.loggedInUser = '';
    }

    history.listen((newLocation, action) => {
      if (action === "PUSH") {
        if (
          newLocation.pathname !== this.currentPathname ||
          newLocation.search !== this.currentSearch
        ) {
          // Save new location
          this.currentPathname = newLocation.pathname;
          this.currentSearch = newLocation.search;

          // Clone location object and push it to history
          history.push({
            pathname: newLocation.pathname,
            search: newLocation.search
          });
        }
      } else {
        // Send user back if they try to navigate back
        history.go(1);
      }
    });
  }
  
  render() {
    this.home = '';
    if(this.loggedInUser===''){
      if (this.props.location.pathname==='/loggedAdminhome' ||this.props.location.pathname==='/manageSchedules'||
      this.props.location.pathname==='/manageDiscounts'||
      this.props.location.pathname==='/reportAirlines' || this.props.location.pathname==='/userMenu') {
        this.loggedInUser='admin';
    } else if(this.props.location.pathname==='/loggeduserHome'){
      this.loggedInUser='user';
    } else {
      this.loggedInUser='';
      this.home = '';
    }
    }
    if (((this.props.location.pathname==='/loggedAdminhome' || this.props.location.pathname==='/userMenu' ||
    this.props.location.pathname==='/bookFlight' ||
    this.props.location.pathname==='/bookAirlineComponent'||
    this.props.location.pathname==='/cancelBooking'||
    this.props.location.pathname==='/bookingHistory'||
    this.props.location.pathname==='/viewTicket' ||
    this.props.location.pathname==='/adminMenu' ||
    this.props.location.pathname==='/addAirline'||
    this.props.location.pathname==='/manageSchedules'||
    this.props.location.pathname==='/manageDiscounts' ||
    this.props.location.pathname==='/reportAirlines') && (this.loggedInUser==='admin'))) {
      this.home =<Home></Home>
    } else if(((this.props.location.pathname==='/loggeduserHome' ||
    this.props.location.pathname==='/bookAirlineComponent' ||
    this.props.location.pathname==='/viewTicket') && (this.loggedInUser==='user'))){
       this.home = <UserMain></UserMain>
    } else if(((this.props.location.pathname==='/') && (this.loggedInUser!==''))){
       this.loggedInUser = '';
       this.home = '';
    }else {
      this.home = '';
    }
    return (
      <div className="App">
      <body 
       img src={flight} className="App-logo" alt="logo" >
       {/* <Home></Home> */}
       <div className="App-header">
        FLIGHT TICKET BOOKING
       </div>
       <div align='center' className='App-div'>
         {/* {this.loggedInUser} */}
    {this.loggedInUser!==''?<div className="App-link">
    <Link to="/" >Logout</Link>
    </div>:''}
       {this.home}
       <Switch>
          <Route exact path="/" component={LoginHome} />
          {this.props.location.pathname === "/home" ? 
          <Route exact path="/home" component={Home} /> : 
          <Route  exact path="/userHome" component={UserHome}/>
          }
          <Route exact path="/login" component={LoginForm} />
          <Route  exact path="/adminMenu" component={AdminMenu} />
          <Route  exact path="/userMenu" component={UserMenu} />
          <Route  exact path="/addAirline" component={AddAirline} />
          <Route  exact path="/manageSchedules" component={EditSchedule} />
          <Route  exact path="/bookFlight" component={BookFlight}/>
          <Route  exact path="/userMain" component={UserMain}/>
          <Route  exact path="/manageDiscounts" component={AddDiscount}/>
          <Route  exact path="/reportAirlines" component={AdminReport}/>
          <Route  exact path="/bookAirlineComponent" component={BookAirlineComponent}/>
          <Route  exact path="/cancelBooking" component={CancelBooking}/>
          <Route  exact path="/bookingHistory" component={BookingHistory}/>
          <Route  exact path="/viewTicket" component={ViewTicket}/>
        </Switch>
        </div>
      </body>
    </div>
    );
  }
}

export default withRouter(App);