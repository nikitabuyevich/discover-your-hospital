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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var LicenseService = (function () {
    function LicenseService(http) {
        this.http = http;
        this.licensesUrl = 'http://localhost:36861/api/licenses'; // URL to web api - only works with command line 'dotnet run' on API
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    LicenseService.prototype.getLicenses = function () {
        return this.http.get(this.licensesUrl)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    LicenseService.prototype.getLicense = function (id) {
        return this.getLicenses()
            .then(function (licenses) { return licenses.find(function (license) { return license.licenseId === id; }); });
    };
    LicenseService.prototype.updateLicense = function (license) {
        var path = this.licensesUrl + "/" + license.licenseId;
        return this.http.put(path, JSON.stringify(license), { headers: this.headers })
            .toPromise()
            .catch(this.handleError);
    };
    LicenseService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    LicenseService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return LicenseService;
}());
LicenseService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], LicenseService);
exports.LicenseService = LicenseService;
//# sourceMappingURL=license.service.js.map