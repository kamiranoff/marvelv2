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
var router_1 = require('angular2/router');
var characters_service_1 = require("../../services/characters.service");
var get_average_rgb_helper_1 = require("../../helpers/get-average-rgb.helper");
var CharactersGrid = (function () {
    function CharactersGrid(_characterService) {
        this._characterService = _characterService;
        this.characters = [];
    }
    CharactersGrid.prototype.changeTitleColorOnHover = function (idx, elm) {
        var img = elm.currentTarget.getElementsByTagName("img")[0];
        var imageColor = get_average_rgb_helper_1.GetAverageRgb.getAverageRGB(img);
        var rgbImageColor = "rgb(" + imageColor.r + "," + imageColor.g + "," + imageColor.b + ")";
        this.characters[idx].dominantColor = rgbImageColor;
    };
    CharactersGrid = __decorate([
        core_1.Component({
            selector: 'characters-grid',
            inputs: ['characters'],
            providers: [characters_service_1.CharactersService],
            directives: [router_1.ROUTER_DIRECTIVES],
            templateUrl: "marvel-app/modules/characters-grid/characters-grid.component.html"
        }), 
        __metadata('design:paramtypes', [characters_service_1.CharactersService])
    ], CharactersGrid);
    return CharactersGrid;
}());
exports.CharactersGrid = CharactersGrid;
