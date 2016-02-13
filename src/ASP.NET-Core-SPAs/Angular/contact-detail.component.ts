import {Component} from 'angular2/core';
import {Contact} from './contact';

@Component({
    selector: 'contact-detail',
    template: `
        <div *ngIf="contact">
            <h2>{{contact.Name}}</h2>
            <div><label>ID: </label>{{contact.Id}}</div>
            <div>
                <label>Name: </label>
                <div><input [(ngModel)]="contact.Name" placeholder="name"></div>
            </div>
            <div>
                <label>Email: </label>
                <div><input [(ngModel)]="contact.EmailAddress" placeholder="email"></div>
            </div>
            <div>
                <label>Phone: </label>
                <div><input [(ngModel)]="contact.PhoneNumber" placeholder="phone"></div>
            </div>
        </div>
        `,
    inputs: ['contact']
})

export class ContactDetailComponent {
    public contact: Contact;
}