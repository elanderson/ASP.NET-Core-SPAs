import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {Contact} from './contact';
import {ContactDetailComponent} from './contact-detail.component';
import {ContactService} from './contact.service';
import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <ul class="contacts">
            <li *ngFor="let contact of contacts" 
              [class.selected]="contact === selectedContact"
              (click)="onSelect(contact)">
                <span class="badge">{{contact.Id}}</span> {{contact.Name}}
            </li>
        </ul>
        <contact-detail [contact]="selectedContact"></contact-detail>
        `,
    directives: [ContactDetailComponent],
    providers: [
        HTTP_PROVIDERS,
        ContactService
    ]
})

export class AppComponent implements OnInit {
    public title = 'Contact List';
    public selectedContact: Contact;
    public contacts: Contact[];

    constructor(private _contactService: ContactService) { }

    getContacts() {
        this._contactService.getContacts()
            .subscribe(
            contacts => {
                console.log(contacts);
                this.contacts = contacts;
            },
            error => alert(error));
    }

    ngOnInit() {
        this.getContacts();
    }

    onSelect(contact: Contact) {
        this.selectedContact = contact;
    }
}