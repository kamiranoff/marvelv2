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
var core_1 = require("angular2/core");
var characters_service_1 = require("../../services/characters.service");
var CharactersGrid = (function () {
    function CharactersGrid(chractersService) {
        this.characters = chractersService.getCharacters();
    }
    CharactersGrid.prototype.changeBgOnHover = function ($event) {
        console.log('hover', $event);
        this.vibrantColor = "red";
    };
    CharactersGrid = __decorate([
        core_1.Component({
            selector: 'characters-grid',
            providers: [characters_service_1.CharactersService],
            templateUrl: "marvel-app/modules/characters-grid/characters-grid.component.html"
        }), 
        __metadata('design:paramtypes', [characters_service_1.CharactersService])
    ], CharactersGrid);
    return CharactersGrid;
}());
exports.CharactersGrid = CharactersGrid;
