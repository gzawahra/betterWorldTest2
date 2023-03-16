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
const station_entity_1 = require("../entities/station.entity");
const axios_1 = require("axios");
let NetworkService = class NetworkService {
    constructor(networkRepository, stationRepository) {
        this.networkRepository = networkRepository;
        this.stationRepository = stationRepository;
    }
    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async syncNetworks() {
        const networks = [];
        let num = -1;
        const tmpNetworks = await axios_1.default
            .get('http://api.citybik.es/v2/networks')
            .then((response) => {
            num = response.data.networks.length;
            console.log(num);
            if (response.status != 200) {
                console.log(response.status);
                throw new common_1.HttpException("bad status", common_1.HttpStatus.TOO_MANY_REQUESTS);
            }
            return response.data.networks;
        })
            .catch((error) => {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.TOO_MANY_REQUESTS);
            console.log(error);
        });
        tmpNetworks.forEach(async (value) => {
            if (await this.networkRepository.findOne({ where: { CityBikes_id: value.id } }) == null) {
                if (value.id !== null && value.id !== undefined) {
                    const tmpNetwork = await this.createNetwork();
                    tmpNetwork.CityBikes_id = value.id;
                    tmpNetwork.name = value.name;
                    tmpNetwork.href = value.href;
                    tmpNetwork.company = value.company;
                    tmpNetwork.city = value.location.city;
                    tmpNetwork.country = value.location.country;
                    await this.updateNetwork(tmpNetwork.id, tmpNetwork);
                    this.delay(100);
                }
            }
        });
        return num;
    }
    async getAllNetworks() {
        this.syncNetworks();
        return await this.networkRepository.find();
    }
    async createNetwork() {
        const network = this.networkRepository.create();
        try {
            await this.networkRepository.save(network);
        }
        catch (error) {
            console.log(network.CityBikes_id);
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return network;
    }
    async createNewNetwork(json) {
        if (json["name"] == null || json["country"] == null || json["city"] == null)
            return common_1.HttpStatus.BAD_REQUEST;
        let network = await this.networkRepository.findOne({ where: { name: json["name"] } }).then(async (value) => {
            if (value == null)
                value = await this.createNetwork();
            return value;
        });
        network.name = json["name"];
        network.company = json["compagny"];
        network.city = json["city"];
        network.country = json["country"];
        this.updateNetwork(network.id, network);
        return await this.networkRepository.findOne({ where: { id: network.id } });
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
    async getNetworkByCityBikeId(id) {
        console.log(id);
        return await this.networkRepository.findOne({ where: { CityBikes_id: id } });
    }
    async getNetwork(id, reqrelations = []) {
        let network = null;
        if (id && reqrelations[0]) {
            network = await this.networkRepository.findOne({
                where: { id },
                relations: reqrelations,
            });
        }
        else {
            network = await this.networkRepository.findOne({ where: { id } });
        }
        if (!network) {
            throw new common_1.HttpException('network not found', common_1.HttpStatus.NOT_FOUND);
        }
        return network;
    }
    async getNetworkByName(name) {
        return await this.networkRepository.findOne({ where: { name } });
    }
    async getNetworkByCity(city) {
        return await this.networkRepository.findOne({ where: { city } });
        ;
    }
    async getStation(id, reqrelations = []) {
        let station = null;
        if (id && reqrelations[0]) {
            station = await this.stationRepository.findOne({
                where: { id },
                relations: reqrelations,
            });
        }
        else {
            station = await this.stationRepository.findOne({ where: { id } });
        }
        if (!station) {
            throw new common_1.HttpException('station not found', common_1.HttpStatus.NOT_FOUND);
        }
        return station;
    }
    async syncStations() {
        const networks = await this.networkRepository.find();
        networks.forEach(async (network) => {
            await axios_1.default
                .get('http://api.citybik.es/v2/networks/' + network.CityBikes_id)
                .then(async (response) => {
                if (response.status == 200) {
                    this.createStations(network, response);
                }
            })
                .catch((error) => {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
            });
        });
    }
    async createStations(network, response) {
        if (response != null && response != undefined)
            response.data.network.stations.forEach(async (value) => {
                if (value.id != null && value.id != undefined) {
                    let station = await this.stationRepository.findOne({ where: { CityBikes_id: value.id } });
                    if (station == null) {
                        station = this.stationRepository.create();
                        await this.stationRepository.save(station);
                    }
                    try {
                        station.network = network;
                        station.CityBikes_id = value.id;
                        station.name = value.name;
                        station.country = network.country;
                        station.longitude = value.longitude;
                        station.latitude = value.latitude;
                        station.empty_slots = value.empty_slots;
                        if (station.empty_slots == null || station.empty_slots == undefined)
                            station.empty_slots = 0;
                        station.free_bikes = value.free_bikes;
                        this.updateStation(station.id, station);
                    }
                    catch (error) {
                        throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
                    }
                }
            });
    }
    async updateStation(id, station) {
        if (!station)
            throw new common_1.HttpException('Body null', common_1.HttpStatus.NOT_FOUND);
        await this.getStation(id);
        try {
            station.id = id;
            await this.stationRepository.update(id, station);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return station;
    }
    async getStationsByCountry(country) {
        return await this.stationRepository.find({ where: { country } });
    }
};
NetworkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(network_entity_1.Network)),
    __param(1, (0, typeorm_1.InjectRepository)(station_entity_1.Station)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], NetworkService);
exports.NetworkService = NetworkService;
//# sourceMappingURL=network.service.js.map