import axios from 'axios';


export class ContactService {
    static serverURL = `http://localhost:9000`;

//  Getting groups name
    static getGroups(){
        let dataURL = `${this.serverURL}/groups`;
        return axios.get(dataURL);
    }
//  Getting groups id
    static getGroup(contact){
        let groupId = contact.groupId;
        let dataURL = `${this.serverURL}/groups/${groupId}`;
        return axios.get(dataURL);
    }
//  Getting contact name
    static getAllContacts(){
        // GET request
       let dataURL = `${this.serverURL}/contacts`;
        return axios.get(dataURL);
    }
//  Getting contact id
    static getContact(contactId){
        let dataURL = `${this.serverURL}/contacts/${contactId}`;
        return axios.get(dataURL);
    }
// posting - createContact
    static createContact(contact){
        let dataURL =`${this.serverURL}/contacts`;
        return axios.post(dataURL, contact);
    }
// update
    static updateContact(contact , contactId){
        let dataURL = `${this.serverURL}/contacts/${contactId}`;
        return axios.put(dataURL,contact);
    }
// delete
    static deleteContact(contactId){
        let dataURL = `${this.serverURL}/contacts/${contactId}`;
        return axios.delete(dataURL);

    }
}

 
   