"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const network_controller_1 = require("./controllers/network.controller");
const network_service_1 = require("./services/network.service");
const network_entity_1 = require("./entities/network.entity");
let NetworkModule = class NetworkModule {
};
NetworkModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([network_entity_1.Network])],
        controllers: [network_controller_1.NetworkController],
        providers: [network_service_1.NetworkService],
        exports: [network_service_1.NetworkService],
    })
], NetworkModule);
exports.NetworkModule = NetworkModule;
//# sourceMappingURL=network.module.js.map