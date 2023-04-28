import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../Services/ContactService";
import Spinner from "../Spinner/Spinner";

let ContactList = () => {

    let [query , setQuery] = useState({
          text: ''
    });
   
    let [state , setState] = useState ( {
         loading : false,
         contacts : [],
         filteredContacts : [],
         errorMessage : ''
    });

    useEffect( () => {
        async function handleResp(){
       try{
          setState({...state, loading: true});
          let response = await ContactService.getAllContacts();
          console.log(response.data);
        setState({
            ...state,
            loading : false,
            contacts : response.data,
            filteredContacts : response.data
        });
       }
       catch (error){
              setState({
                ...state,
                loading : false,
                errorMessage : error.message
              })
       }
      };
      handleResp();
    } , []);

//delete contact
let clickDelete = async (contactId) =>{
    try{
        let response = await ContactService.deleteContact(contactId);
        if (response){
            setState({...state, loading: true});
            // This will fetch remaining data- except deleted
            let response = await ContactService.getAllContacts();
            // console.log(response.data);
            setState({
            ...state,
            loading : false,
            contacts : response.data,
            filteredContacts : response.data
            });
        }
    } catch (error){
        setState({
         ...state,
        loading : false,
        errorMessage : error.message
        });
     }
};
// search contacts
let searchContacts =(event) => {
     setQuery({...query, text : event.target.value});
     let theContacts = state.contacts.filter(contact => {
        return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
     })
    //  console.log(theContacts);
    setState({
        ...state,
        filteredContacts: theContacts
    })
}


let { loading, contacts,filteredContacts, errorMessage} = state;


    return (
        <React.Fragment>
        {/* below pre tag just for checking backend data are working in UI */}
        {/* <pre>{JSON.stringify(contacts)}</pre> */}
        {/* below pre tag just for checking search input are working in UI  */}
        {/* <pre>{JSON.stringify(query.text)}</pre> */}
        
         {/* In this section (contact Manager, add button, paragraph, searchtype and submitbutton) */}
            <section className="contact-search p-3">
                <div className="container">
                    <div className="grid">
                        <div className="col">
                            <p className="h3 fw-bold">Contact Manager
                            <Link to ={'/contacts/add'} className="btn btn-primary ms-2"> 
                            <i className="fa fa-plus-circle me-2"></i> NEW </Link></p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit, Corporis est nemo quia ratione voluptatem. Ad aliquid blanditiis cupiditate debitis, deserunt ea euis et eum, facere optio pariatur,quas soluta tempore.</p>
                            <form className="row">
                            <div className="col">
                              <div className="mb-2">
                                    <input 
                                    name="text"
                                    value={query.text}
                                    onChange={searchContacts}
                                    type="text" className="form-control" placeholder="Search Names"/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-2">
                                    <input type="submit" className="btn btn-warning" value="Search"/>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {
                loading ? <Spinner/> : <React.Fragment>

                 {/* In this section adding the cart */}
            <section className="contact-list">
                <div className="container">
                    <div className="row">
                    {/* Each contact are Loop through and return inside */}
                    {
                        filteredContacts.length > 0 && 
                        filteredContacts.map(contact => {
                            return(
                                <div className="col-md-6" key={contact.id}>
                            <div className="card my-2">
                                <div className="card-body">
                                    <div className="row align-items-center d-flex justify-content-around">
                                    <div className="col-md-4">
                                    <img src={contact.photo} alt="" className="contact-img"/>
                                    </div>
                                    <div className="col-md-7">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-action">
                                            Name : <span className="fw-bold">{contact.name}</span>
                                        </li>
                                      
                                        <li className="list-group-item list-group-item-action">
                                            Mobile : <span className="fw-bold">{contact.mobile}</span>
                                        </li>
                                     
                                        <li className="list-group-item list-group-item-action">
                                            Email : <span className="fw-bold">{contact.email}</span>
                                        </li>
                                    </ul>
                                    </div>
                                    <div className="col-md-1 d-flex flex-column align-items-center">
                                       <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning my-2">
                                        <i className="fa fa-eye"/>
                                       </Link>
                                       <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary my-2">
                                        <i className="fa fa-pen"/>
                                       </Link>
                                       <button className="btn btn-danger my-2"onClick={() => clickDelete(contact.id)}>
                                        <i className="fa fa-trash"/>
                                       </button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            )
                           })
                    }
                        
                        {/* Secound card */}
                        {/* <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row align-items-center d-flex justify-content-around">
                                    <div className="col-md-4">
                                    <img src="https://t3.ftcdn.net/jpg/03/72/38/88/360_F_372388834_bUf3QEyES2fkPj0D7g0ZBMng2DuSgld7.jpg" alt="image" className="img-fluid contact-img"/>
                                    </div>
                                    <div className="col-md-7">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-action">
                                            Name : <span className="fw-bold">Kishorekumar</span>
                                        </li>
                                      
                                        <li className="list-group-item list-group-item-action">
                                            Mobile : <span className="fw-bold">7708780564</span>
                                        </li>
                                     
                                        <li className="list-group-item list-group-item-action">
                                            Email : <span className="fw-bold">kishoreRajkumar@gmail.com</span>
                                        </li>
                                    </ul>
                                    </div>
                                    <div className="col-md-1 d-flex flex-column align-items-center">
                                       <Link to={'/contacts/view/:contactId'} className="btn btn-warning my-2">
                                        <i className="fa fa-eye"/>
                                       </Link>
                                       <Link to={'/contacts/edit/:contactId'} className="btn btn-primary my-2">
                                        <i className="fa fa-pen"/>
                                       </Link>
                                       <button className="btn btn-danger my-2">
                                        <i className="fa fa-trash"/>
                                       </button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>

                </React.Fragment>
            }

        </React.Fragment>
    )
};
export default ContactList;