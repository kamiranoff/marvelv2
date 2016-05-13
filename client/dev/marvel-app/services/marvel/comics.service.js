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
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
var ComicsService = (function () {
    function ComicsService(http) {
        this.http = http;
        this._comicsUrl = '/api/marvelapi/comics';
    }
    ComicsService.prototype.getComics = function () {
        return this.http.get(this._comicsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ComicsService.prototype.getMoreComics = function (lastId, qty) {
        if (lastId) {
            return this.http.get(this._comicsUrl + "?lastid=" + lastId + "&qty=" + qty)
                .map(this.extractData)
                .catch(this.handleError);
        }
    };
    ComicsService.prototype.searchComicsByTitle = function (userInput) {
        return this.http.get(this._comicsUrl + "?title=" + userInput)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ComicsService.prototype.getMoreComicsFromSearch = function (searchTerm, lastId, qty) {
        console.log(searchTerm);
        if (lastId) {
            return this.http.get(this._comicsUrl + "?title=" + searchTerm + "&lastid=" + lastId + "&qty=" + qty)
                .map(this.extractData)
                .catch(this.handleError);
        }
    };
    //getCharcterByCategory(categoryName):Observable<any>{
    //  return this.http.get(this._comicsUrl + "?categories=" + categoryName )
    //    .map(this.extractData)
    //    .catch(this.handleError);
    //}
    ComicsService.prototype.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        var body = res.json();
        return body || {};
    };
    ComicsService.prototype.handleError = function (error) {
        // In a real world app, we might send the error to remote logging infrastructure
        var errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Rx_1.Observable.throw(errMsg);
    };
    ComicsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ComicsService);
    return ComicsService;
}());
exports.ComicsService = ComicsService;
