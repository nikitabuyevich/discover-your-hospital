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
var router_1 = require("@angular/router");
var license_service_1 = require("./license.service");
var LicensesComponent = (function () {
    function LicensesComponent(licenseService, router) {
        this.licenseService = licenseService;
        this.router = router;
        this.licenses = [];
    }
    LicensesComponent.prototype.getLicenses = function () {
        var _this = this;
        this.licenseService
            .getLicenses()
            .then(function (licenses) { return _this.licenses = licenses; });
    };
    LicensesComponent.prototype.ngOnInit = function () {
        this.getLicenses();
    };
    LicensesComponent.prototype.gotoDetail = function (license) {
        this.router.navigate(['/licenses', license.licenseId]);
    };
    return LicensesComponent;
}());
LicensesComponent = __decorate([
    core_1.Component({
        selector: 'my-license',
        templateUrl: 'app/license/licenses.component.html'
    }),
    __metadata("design:paramtypes", [license_service_1.LicenseService,
        router_1.Router])
], LicensesComponent);
exports.LicensesComponent = LicensesComponent;
//# sourceMappingURL=licenses.component.js.map