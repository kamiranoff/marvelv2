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
var Rx_1 = require("rxjs/Rx");
var core_1 = require('angular2/core');
var http_1 = require("angular2/http");
var CharacterDetailService = (function () {
    function CharacterDetailService(http) {
        this.http = http;
        this._heroDetailUrl = '/api/marvelapi/character/';
        this._saveHeroUrl = '/api/marvelapi/characters-details/';
    }
    CharacterDetailService.prototype.getCharacterById = function (id) {
        return this.http.get(this._heroDetailUrl + id)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CharacterDetailService.prototype.saveCharWithName = function (name) {
        return this.http.get(this._saveHeroUrl + name)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CharacterDetailService.prototype.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        var body = res.json();
        return body || {};
    };
    CharacterDetailService.prototype.handleError = function (error) {
        // In a real world app, we might send the error to remote logging infrastructure
        var errMsg = error.message || 'Server error';
        console.log('error.message', error.message);
        console.error(errMsg); // log to console instead
        return Rx_1.Observable.throw(errMsg);
    };
    CharacterDetailService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CharacterDetailService);
    return CharacterDetailService;
}());
exports.CharacterDetailService = CharacterDetailService;
