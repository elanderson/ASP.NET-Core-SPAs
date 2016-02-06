System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var ContactDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ContactDetailComponent = (function () {
                function ContactDetailComponent() {
                }
                ContactDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'contact-detail',
                        template: "\n        <div *ngIf=\"contact\">\n            <h2>{{contact.Name}}</h2>\n            <div><label>ID: </label>{{contact.Id}}</div>\n            <div>\n                <label>Name: </label>\n                <div><input [(ngModel)]=\"contact.Name\" placeholder=\"name\"></div>\n            </div>\n            <div>\n                <label>Email: </label>\n                <div><input [(ngModel)]=\"contact.Email\" placeholder=\"email\"></div>\n            </div>\n            <div>\n                <label>Phone: </label>\n                <div><input [(ngModel)]=\"contact.Phone\" placeholder=\"phone\"></div>\n            </div>\n        </div>\n        ",
                        inputs: ['contact']
                    }), 
                    __metadata('design:paramtypes', [])
                ], ContactDetailComponent);
                return ContactDetailComponent;
            })();
            exports_1("ContactDetailComponent", ContactDetailComponent);
        }
    }
});
//# sourceMappingURL=contact-detail.component.js.map