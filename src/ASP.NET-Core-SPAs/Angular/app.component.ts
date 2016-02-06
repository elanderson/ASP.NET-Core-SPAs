import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Contact} from './contact';
import {ContactDetailComponent} from './contact-detail.component';
import {ContactService} from './contact.service';
import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <ul class="contacts">
            <li *ngFor="#contact of contacts" 
              [class.selected]="contact === selectedContact"
              (click)="onSelect(contact)">
                <span class="badge">{{contact.Id}}</span> {{contact.Name}}
            </li>
        </ul>
        <contact-detail [contact]="selectedContact"></contact-detail>
        `,
    styles: [`
      .selected {
        background-color: #CFD8DC !important;
        color: white;
      }
      .contacts {
        margin: 0 0 2em 0;
        list-style-type: none;
        padding: 0;
        width: 10em;
      }
      .contacts li {
        cursor: pointer;
        position: relative;
        left: 0;
        background-color: #EEE;
        margin: .5em;
        padding: .3em 0em;
        height: 1.6em;
        border-radius: 4px;
      }
      .contacts li.selected:hover {
        color: white;
      }
      .contacts li:hover {
        color: #607D8B;
        background-color: #EEE;
        left: .1em;
      }
      .contacts .text {
        position: relative;
        top: -3px;
      }
      .contacts .badge {
        display: inline-block;
        font-size: small;
        color: white;
        padding: 0.8em 0.7em 0em 0.7em;
        background-color: #607D8B;
        line-height: 1em;
        position: relative;
        left: -1px;
        top: -4px;
        height: 1.8em;
        margin-right: .8em;
        border-radius: 4px 0px 0px 4px;
      }
    `],
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