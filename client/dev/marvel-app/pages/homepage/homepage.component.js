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
var Rx_1 = require("rxjs/Rx"); //full api
var characters_grid_component_1 = require("../../modules/characters-grid/characters-grid.component");
var search_component_1 = require("../../modules/search/search.component");
var characters_service_1 = require("../../services/characters.service");
var filter_component_1 = require("../../modules/filter/filter.component");
var Homepage = (function () {
    function Homepage(_characterService) {
        this._characterService = _characterService;
        this.characters = [];
        this.getCharacters();
    }
    Homepage.prototype.getCharacters = function () {
        var _this = this;
        this._characterService.getCharacters()
            .subscribe(function (characters) {
            _this.characters = characters;
            _this.allCharactersLoaded = characters;
        }, function (error) { return _this.errorMessage = error; });
    };
    Homepage.prototype.onSearchChanged = function (searchInput) {
        var _this = this;
        if (searchInput === '') {
            this.characters = this.allCharactersLoaded;
            this.isActive = false;
            return;
        }
        this.isActive = true;
        var keyups = Rx_1.Observable.of(searchInput)
            .filter(function (text) { return text.length >= 1; })
            .debounceTime(300)
            .distinctUntilChanged()
            .flatMap(function (searchTerm) { return _this._characterService.searchCharactersByName(searchTerm); });
        keyups.subscribe(function (data) {
            _this.characters = data;
            _this.isActive = false;
        });
    };
    Homepage = __decorate([
        core_1.Component({
            selector: 'homepage',
            providers: [characters_service_1.CharactersService],
            directives: [characters_grid_component_1.CharactersGrid, search_component_1.SearchComponent, filter_component_1.FilterComponent],
            template: "\n\n    <search-component [isActive]=\"isActive\" class=\"search-view-container\"\n    (searchTerm)=\"onSearchChanged($event)\"></search-component>\n    <filter></filter>\n    <characters-grid [characters]=\"characters\"></characters-grid>\n  "
        }), 
        __metadata('design:paramtypes', [characters_service_1.CharactersService])
    ], Homepage);
    return Homepage;
}());
exports.Homepage = Homepage;
