import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import 'fetch';

export class ContactService {
    static inject = [HttpClient];

    constructor(http) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('http://localhost:6555/api/contacts/');
        });

        this.http = http;
    }

    GetAll() {
        return this.http.fetch('')
            .then(response => response.json())
            .then(contacts => this.contacts = contacts)
            .catch(error => console.log(error));
    }

}