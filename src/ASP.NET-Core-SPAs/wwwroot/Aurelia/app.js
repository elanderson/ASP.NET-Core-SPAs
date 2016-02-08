import {inject} from 'aurelia-framework';
import {ContactService} from 'contactService';

export class ContactList {
    static inject = [ContactService];
    heading = 'Contact List';

    constructor (cs) {
        this.ContactService = cs;
    }

    created() {
        this.ContactService.GetAll()
            .then(contacts => this.contacts = contacts);
    }
    
}