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
exports.NetworkController = void 0;
const common_1 = require("@nestjs/common");
const network_service_1 = require("../services/network.service");
let NetworkController = class NetworkController {
    constructor(networkService) {
        this.networkService = networkService;
    }
    getAllUsers() {
        return this.networkService.getAllNetworks();
    }
    getNetworkByName(name) {
        common_1.Logger.log('get by name');
        return this.networkService.getNetworkByName(name);
    }
    getNetworkByCity(city) {
        common_1.Logger.log('get by city');
        return this.networkService.getNetworkByCity(city);
    }
    createNetwork(json) {
        common_1.Logger.log('get by city');
        console.log(json);
        return this.networkService.createNewNetwork(json);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NetworkController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('/name/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NetworkController.prototype, "getNetworkByName", null);
__decorate([
    (0, common_1.Get)('/city/:city'),
    __param(0, (0, common_1.Param)('city')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NetworkController.prototype, "getNetworkByCity", null);
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NetworkController.prototype, "createNetwork", null);
NetworkController = __decorate([
    (0, common_1.Controller)('network'),
    __metadata("design:paramtypes", [network_service_1.NetworkService])
], NetworkController);
exports.NetworkController = NetworkController;
//# sourceMappingURL=network.controller.js.map