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
exports.NetworkService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const network_entity_1 = require("../entities/network.entity");
const axios_1 = require("axios");
let NetworkService = class NetworkService {
    constructor(networkRepository) {
        this.networkRepository = networkRepository;
    }
    async getAllNetworks() {
        console.log('get all networks');
        const networks = [];
        const tmp = await axios_1.default
            .get('http://api.citybik.es/v2/networks')
            .then((response) => {
            return response.data;
        })
            .catch((error) => {
            console.log(error);
        });
        tmp.networks.forEach(function (network) {
            networks.push(network.id, network.name, network.href, network.company, network.location.city, network.location.country, null);
        });
        return networks;
    }
    async createNetwork() {
        const network = this.networkRepository.create();
        try {
            await this.networkRepository.save(network);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return network;
    }
    async updateNetwork(id, network) {
        if (!network)
            throw new common_1.HttpException('Body null', common_1.HttpStatus.NOT_FOUND);
        await this.getNetwork(id);
        try {
            network.id = id;
            await this.networkRepository.update(id, network);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return network;
    }
    async getNetwork(id, reqrelations = []) {
        let network = null;
        if (id && reqrelations[0]) {
            console.log('with');
            network = await this.networkRepository.findOne({
                where: { id },
                relations: reqrelations,
            });
        }
        else {
            console.log('without');
            network = await this.networkRepository.findOne({ where: { id } });
        }
        if (!network) {
            throw new common_1.HttpException('network not found', common_1.HttpStatus.NOT_FOUND);
        }
        return network;
    }
    async getNetworkByName(name) {
        return null;
    }
    async getNetworkByCity(city) {
        return null;
    }
    async getStationByCountry(country) {
        return null;
    }
};
NetworkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(network_entity_1.Network)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NetworkService);
exports.NetworkService = NetworkService;
//# sourceMappingURL=network.service.js.map