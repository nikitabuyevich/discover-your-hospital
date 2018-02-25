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
var license_1 = require("./license");
var LicenseDetailComponent = (function () {
    function LicenseDetailComponent(licenseService, route, router) {
        this.licenseService = licenseService;
        this.route = route;
        this.router = router;
    }
    LicenseDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.licenseService.getLicense(id)
                .then(function (license) { return _this.license = license; });
        });
    };
    LicenseDetailComponent.prototype.save = function () {
        var _this = this;
        this.licenseService.updateLicense(this.license)
            .then(function () { return _this.router.navigate(['/licenses']); });
    };
    return LicenseDetailComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", license_1.License)
], LicenseDetailComponent.prototype, "license", void 0);
LicenseDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-license-detail',
        templateUrl: 'license-detail.component.html',
        styleUrls: ['license-detail.component.css']
    }),
    __metadata("design:paramtypes", [license_service_1.LicenseService,
        router_1.ActivatedRoute,
        router_1.Router])
], LicenseDetailComponent);
exports.LicenseDetailComponent = LicenseDetailComponent;
//# sourceMappingURL=license-detail.component.js.map