import React from "react";
import './App.css';
import {Routes , Route, Navigate} from 'react-router-dom'
import NavBar from "./Components/NavBar/NavBar";
import ContactList from "./Components/Contacts/ContactList";
import AddContact from "./Components/Contacts/AddContact";
import ViewContact from "./Components/Contacts/ViewContact";
import EditContact from "./Components/Contacts/EditContact";


let App = () => {
  return (
    <React.Fragment>
    <NavBar/>
    <Routes>
      <Route path={'/'} element ={<Navigate to ={'/contacts/list'}/>} />
      <Route path= {'/contacts/list'} element={<ContactList/>} />
      <Route path= {'/contacts/add'} element={<AddContact/>} />
      <Route path= {'/contacts/view/:contactId'} element={<ViewContact/>} />
      <Route path= {'/contacts/edit/:contactId'} element={<EditContact/>} />

    </Routes>

    </React.Fragment>



    //   // /* <h1>contact mannager</h1> */}
    //   // {/* checking bootstrap and font icons are working 
    //  <button className="btn btn-success me-2">
    //   <i className="fa fa-home"></i> HElloo</button>
    //   <button className="btn btn-success me-2">HElloo</button>  */}

    
  );
}

export default App;
