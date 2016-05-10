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
///<reference path="../../../../node_modules/rxjs/Observable.d.ts"/>
var Rx_1 = require("rxjs/Rx");
var core_1 = require('angular2/core');
var http_1 = require("angular2/http");
var ComicvineDCCharactersService = (function () {
    function ComicvineDCCharactersService(http) {
        this.http = http;
        this._heroesUrl = '/api/comicvine/dc/characters';
    }
    ComicvineDCCharactersService.prototype.getCharactersFromDC = function () {
        return this.http.get(this._heroesUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ComicvineDCCharactersService.prototype.getMoreCharactersFromDC = function (lastName, qty) {
        if (lastName) {
            return this.http.get(this._heroesUrl + "?lastName=" + lastName + "&qty=" + qty)
                .map(this.extractData)
                .catch(this.handleError);
        }
    };
    ComicvineDCCharactersService.prototype.searchCharactersByNameFromDC = function (userInput) {
        return this.http.get(this._heroesUrl + "?name=" + userInput)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ComicvineDCCharactersService.prototype.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        var body = res.json();
        return body || {};
    };
    ComicvineDCCharactersService.prototype.handleError = function (error) {
        // In a real world app, we might send the error to remote logging infrastructure
        var errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Rx_1.Observable.throw(errMsg);
    };
    ComicvineDCCharactersService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ComicvineDCCharactersService);
    return ComicvineDCCharactersService;
}());
exports.ComicvineDCCharactersService = ComicvineDCCharactersService;
