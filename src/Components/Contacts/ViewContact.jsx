import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactService } from "../../Services/ContactService";
import Spinner from "../Spinner/Spinner";


let ViewContact = () => {
//    In Routes (App.js) what paras(contact.Id) will pass same you have give here
    let {contactId} = useParams();

    let [state, setState] = useState({
        loading : false,
        contact : {},
        errorMessage : '',
        group : {}
    });

    useEffect(() => {
        async function handleResp(){
            try {
                setState({...state , loading: true});
                let response = await ContactService.getContact(contactId);
                // console.log(response.data)
                let groupResponse = await ContactService.getGroups(response.data);
                console.log(groupResponse.data)
                setState({
                    ...state,
                    loading : false,
                    contact: response.data,
                    group: groupResponse.data
                });
            }
            catch (error){
                setState({
                    ...state,
                    loading: false,
                    errorMessage: error.message
                });
            }
        };
        handleResp();
    },[])

    let {loading, contact, errorMessage, group} = state;


    return (
        <React.Fragment>
            {/* <h2>ViewContact</h2> */}
            <section className="view-contact-intro p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-warning fw-bold">View Contact</p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit, Corporis est nemo quia ratione voluptatem. Ad aliquid blanditiis cupiditate debitis, deserunt ea euis et eum, facere optio pariatur,quas soluta tempore.</p>
                        </div>
                    </div>
                </div>
            </section>

           {
              loading ? <Spinner/> : <React.Fragment>
              {
                /* If the condition works then diplay the section in UI and then adding group values in condition */

                Object.keys(contact).length > 0 && Object.keys(group).length > 0 &&
                <section className="view-contact mt-3">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                        <img src={contact.photo} alt="" className="contact-img"/>
                        </div>
                        <div className="col-md-8">
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

                             <li className="list-group-item list-group-item-action">
                                Company : <span className="fw-bold">{contact.company}</span>
                             </li>

                             <li className="list-group-item list-group-item-action">
                                Title : <span className="fw-bold">{contact.title}</span>
                             </li>

                             <li className="list-group-item list-group-item-action">
                                Group : <span className="fw-bold">{group.name}</span>
                             </li>
                         </ul>

                        </div>
                        <div className="row">
                            <div className="col">
                                <Link to ={'/contacts/list'} className="btn btn-warning">Back</Link>
                            </div>
                        </div>
                    </div>
                </div> 
            </section>
              }

              </React.Fragment>
           }

            
        </React.Fragment>
    )
};
export default ViewContact