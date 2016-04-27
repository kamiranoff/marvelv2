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
var character_detail_service_1 = require("../../services/character-detail.service");
var parallax_directive_1 = require("../../helpers/parallax.directive");
var CharacterDetail = (function () {
    function CharacterDetail(_characterDetailService, params) {
        this._characterDetailService = _characterDetailService;
        this.character = {};
        this.id = params.get('id');
        this.name = params.get('name');
        this.getCharacterDetail(this.id);
        this.saveCharacterDetail(this.name);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    CharacterDetail.prototype.saveCharacterDetail = function (name) {
        var _this = this;
        this._characterDetailService.saveCharWithName(name)
            .subscribe(function () {
            console.log('success');
        }, function (error) {
            _this.errorMessage = error;
            console.log('error', error);
        });
    };
    CharacterDetail.prototype.getCharacterDetail = function (id) {
        var _this = this;
        this._characterDetailService.getCharacterById(id)
            .subscribe(function (character) {
            _this.character = character[0].character;
        }, function (error) { return _this.errorMessage = error; });
    };
    CharacterDetail = __decorate([
        core_1.Component({
            selector: 'character-detail',
            directives: [parallax_directive_1.Parallax],
            providers: [character_detail_service_1.CharacterDetailService],
            templateUrl: 'marvel-app/modules/character-detail/character-detail.component.html'
        }), 
        __metadata('design:paramtypes', [character_detail_service_1.CharacterDetailService, router_1.RouteParams])
    ], CharacterDetail);
    return CharacterDetail;
}());
exports.CharacterDetail = CharacterDetail;
