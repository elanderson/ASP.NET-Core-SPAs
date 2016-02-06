System.register(['angular2/core', 'angular2/http', './contact-detail.component', './contact.service', 'rxjs/Rx'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, contact_detail_component_1, contact_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (contact_detail_component_1_1) {
                contact_detail_component_1 = contact_detail_component_1_1;
            },
            function (contact_service_1_1) {
                contact_service_1 = contact_service_1_1;
            },
            function (_1) {}],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_contactService) {
                    this._contactService = _contactService;
                    this.title = 'Contact List';
                }
                AppComponent.prototype.getContacts = function () {
                    var _this = this;
                    this._contactService.getContacts()
                        .subscribe(function (contacts) {
                        console.log(contacts);
                        _this.contacts = contacts;
                    }, function (error) { return alert(error); });
                };
                AppComponent.prototype.ngOnInit = function () {
                    this.getContacts();
                };
                AppComponent.prototype.onSelect = function (contact) {
                    this.selectedContact = contact;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n        <h1>{{title}}</h1>\n        <ul class=\"contacts\">\n            <li *ngFor=\"#contact of contacts\" \n              [class.selected]=\"contact === selectedContact\"\n              (click)=\"onSelect(contact)\">\n                <span class=\"badge\">{{contact.Id}}</span> {{contact.Name}}\n            </li>\n        </ul>\n        <contact-detail [contact]=\"selectedContact\"></contact-detail>\n        ",
                        styles: ["\n      .selected {\n        background-color: #CFD8DC !important;\n        color: white;\n      }\n      .contacts {\n        margin: 0 0 2em 0;\n        list-style-type: none;\n        padding: 0;\n        width: 10em;\n      }\n      .contacts li {\n        cursor: pointer;\n        position: relative;\n        left: 0;\n        background-color: #EEE;\n        margin: .5em;\n        padding: .3em 0em;\n        height: 1.6em;\n        border-radius: 4px;\n      }\n      .contacts li.selected:hover {\n        color: white;\n      }\n      .contacts li:hover {\n        color: #607D8B;\n        background-color: #EEE;\n        left: .1em;\n      }\n      .contacts .text {\n        position: relative;\n        top: -3px;\n      }\n      .contacts .badge {\n        display: inline-block;\n        font-size: small;\n        color: white;\n        padding: 0.8em 0.7em 0em 0.7em;\n        background-color: #607D8B;\n        line-height: 1em;\n        position: relative;\n        left: -1px;\n        top: -4px;\n        height: 1.8em;\n        margin-right: .8em;\n        border-radius: 4px 0px 0px 4px;\n      }\n    "],
                        directives: [contact_detail_component_1.ContactDetailComponent],
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            contact_service_1.ContactService
                        ]
                    }), 
                    __metadata('design:paramtypes', [contact_service_1.ContactService])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map