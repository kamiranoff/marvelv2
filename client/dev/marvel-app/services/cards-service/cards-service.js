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
var http_1 = require("@angular/http");
var services_helpers_1 = require("../../helpers/services-helpers");
var CardsService = (function () {
    function CardsService(http) {
        this.http = http;
        this._cardsUrl = '/api/marvelapi/characters?qty=';
    }
    CardsService.prototype.getHeroes = function (qty) {
        return this.http.get(this._cardsUrl + qty)
            .map(services_helpers_1.ServicesHelpers.extractData)
            .catch(services_helpers_1.ServicesHelpers.handleError);
    };
    CardsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CardsService);
    return CardsService;
}());
exports.CardsService = CardsService;
