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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationController = void 0;
const common_1 = require("@nestjs/common");
const network_service_1 = require("../services/network.service");
let StationController = class StationController {
    constructor(networkService) {
        this.networkService = networkService;
    }
    getNetworkByName(country) {
        common_1.Logger.log('get stations by Country');
        return this.networkService.getStationsByCountry(country);
    }
};
__decorate([
    (0, common_1.Get)('/:country'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "getNetworkByName", null);
StationController = __decorate([
    (0, common_1.Controller)('stations'),
    __metadata("design:paramtypes", [network_service_1.NetworkService])
], StationController);
exports.StationController = StationController;
//# sourceMappingURL=station.controller.js.map