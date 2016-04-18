System.register(['angular2/core', 'angular2/http', './contact-detail.component', './contact.service', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
                        directives: [contact_detail_component_1.ContactDetailComponent],
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            contact_service_1.ContactService
                        ]
                    }), 
                    __metadata('design:paramtypes', [contact_service_1.ContactService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map