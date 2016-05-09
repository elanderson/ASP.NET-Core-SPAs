import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Contact} from './contact';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ContactService {
    private _url = 'http://localhost:6555/api/contacts/';
    constructor(private http: Http) { }

    getContacts() {
        return this.http.get(this._url)
            .map(responce => <Contact[]>responce.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }
}