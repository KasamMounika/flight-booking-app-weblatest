import React, { useState } from 'react';
import { useHistory} from 'react-router-dom';
import './Home.css';

const Home = () => {
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
    history.push("/home");
    
  }

  const clickedAdmin = (event) => {
    event.preventDefault();
    console.log('clicked Admin');
    setBtn_class("button_selected");
    setButton_Index(event.currentTarget.id);
    console.log(button_Index);
    history.push("/adminMenu");
  }

  const clickedUser = (event) => {
    event.preventDefault();
    console.log('clicked User');
    setBtn_class("button_selected");
    setButton_Index(event.currentTarget.id);
    console.log(button_Index);
    history.push("/userMenu");
  }
  return (
    <div>
    <div className="bs-example-align">
     <button type='submit' id={0} className={button_Index===0?btn_class:btn_classClick} onClick={e => clickedHome(e)}>Home</button>
    <button type='submit' id={1} className={button_Index===1?btn_class:btn_classClick} onClick={e => clickedAdmin(e)}>Admin</button>
    <button type='submit' id={2} className={button_Index===2?btn_class:btn_classClick} onClick={e => clickedUser(e)}>User</button>
    </div>
    <div>
    </div>

    </div>
  );
};

export default Home;