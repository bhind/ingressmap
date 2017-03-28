"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent(_zone) {
        var _this = this;
        this._zone = _zone;
        this.googleLoginButtonId = "google-login-button";
        this.userAuthToken = null;
        this.userDisplayName = "empty";
        // Triggered after a user successfully logs in using the Google external
        // login provider.
        this.onGoogleLoginSuccess = function (loggedInUser) {
            _this._zone.run(function () {
                _this.userAuthToken = loggedInUser.getAuthResponse().id_token;
                _this.userDisplayName = loggedInUser.getBasicProfile().getName();
            });
        };
        console.log(this);
    }
    // Angular hook that allows for interaction with elements inserted by the
    // rendering of a view.
    AppComponent.prototype.ngAfterViewInit = function () {
        // Converts the Google login button stub to an actual button.
        gapi.signin2.render(this.googleLoginButtonId, {
            "onSuccess": this.onGoogleLoginSuccess,
            "scope": "profile",
            "theme": "dark"
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: '<h1>My First Angular App</h1>'
        }), 
        __metadata('design:paramtypes', [core_1.NgZone])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map