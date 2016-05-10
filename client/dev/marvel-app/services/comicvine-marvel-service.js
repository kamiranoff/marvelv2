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
var ComicvineMarvelCharactersService = (function () {
    function ComicvineMarvelCharactersService(http) {
        this.http = http;
        this._heroesUrl = '/api/comicvine/marvel/characters';
    }
    ComicvineMarvelCharactersService.prototype.getCharactersFromMarvel = function () {
        return this.http.get(this._heroesUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ComicvineMarvelCharactersService.prototype.getMoreCharactersFromMarvel = function (lastName, qty) {
        if (lastName) {
            return this.http.get(this._heroesUrl + "?lastName=" + lastName + "&qty=" + qty)
                .map(this.extractData)
                .catch(this.handleError);
        }
    };
    ComicvineMarvelCharactersService.prototype.searchCharactersByNameFromMarvel = function (userInput) {
        return this.http.get(this._heroesUrl + "?name=" + userInput)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ComicvineMarvelCharactersService.prototype.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        var body = res.json();
        return body || {};
    };
    ComicvineMarvelCharactersService.prototype.handleError = function (error) {
        // In a real world app, we might send the error to remote logging infrastructure
        var errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Rx_1.Observable.throw(errMsg);
    };
    ComicvineMarvelCharactersService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ComicvineMarvelCharactersService);
    return ComicvineMarvelCharactersService;
}());
exports.ComicvineMarvelCharactersService = ComicvineMarvelCharactersService;
