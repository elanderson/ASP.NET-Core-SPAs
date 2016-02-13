import {inject} from 'aurelia-framework';
import {ContactService} from 'contactService';

export class ContactList {
    static inject = [ContactService];
    heading = 'Contact List';
    selectedContact = null;

    constructor (cs) {
        this.ContactService = cs;
    }

    created() {
        this.ContactService.GetAll()
            .then(contacts => this.contacts = contacts);
    }

    select(contact) {
        this.selectedContact = contact;
    }
    
}