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
var search_component_1 = require("../../modules/search/search.component");
var go_back_up_component_1 = require("../../modules/go-back-up/go-back-up.component");
var comicvine_service_1 = require("../../services/comicvine-service");
var comicvine_grid_component_1 = require("../../modules/comicvine-grid/comicvine-grid.component");
var search_filter_service_1 = require("../../services/search-filter.service");
var ComicvineCharPage = (function () {
    function ComicvineCharPage(_comicvineCharacterService) {
        this._comicvineCharacterService = _comicvineCharacterService;
        this.characters = [];
        this.searchTerm = '';
        this.isSearchedActivated = false;
        this.loadMoreChar = true;
        this.getCharacters();
        this.loadMoreChar = true;
    }
    ComicvineCharPage.prototype.getCharacters = function () {
        var _this = this;
        this._comicvineCharacterService.getCharacters()
            .subscribe(function (characters) {
            _this.characters = characters;
            console.log(_this.characters);
            _this.allCharactersLoaded = characters;
            _this.lastId = characters[characters.length - 1]._id;
        }, function (error) { return _this.errorMessage = error; });
    };
    ComicvineCharPage.prototype.getMoreCharacters = function (lastId, qty) {
        var _this = this;
        if (!this._comicvineCharacterService.getMoreCharacters(lastId, qty)) {
            return;
        }
        this._comicvineCharacterService.getMoreCharacters(lastId, qty)
            .subscribe(function (characters) {
            if (characters.length === 0) {
                return;
            }
            _this.characters = _this.characters.concat(characters);
            _this.allCharactersLoaded = _this.characters;
            _this.lastId = characters[characters.length - 1]._id;
            _this.loadMoreChar = true;
        }, function (error) { return _this.errorMessage = error; });
    };
    ComicvineCharPage.prototype.onSearchChanged = function (searchInput) {
        var _this = this;
        this.searchTerm = searchInput;
        if (searchInput === '') {
            this.characters = this.allCharactersLoaded;
            this.isActive = false;
            this.isSearchedActivated = false;
            return;
        }
        this.isSearchedActivated = true;
        this.isActive = true;
        var keyups = Rx_1.Observable.of(searchInput)
            .filter(function (text) { return text.length >= 1; })
            .debounceTime(300)
            .distinctUntilChanged()
            .flatMap(function (searchTerm) { return _this._comicvineCharacterService.searchCharactersByName(searchTerm); });
        keyups.subscribe(function (data) {
            _this.characters = data;
            _this.isActive = false;
        });
    };
    ComicvineCharPage.prototype.onBottomOfPage = function ($event) {
        this.loadMoreChar = false;
        if (this.isSearchedActivated) {
            return;
        }
        this.getMoreCharacters(this.lastId, 100);
    };
    ComicvineCharPage = __decorate([
        core_1.Component({
            selector: 'ComicvinePage',
            providers: [comicvine_service_1.ComicvineCharactersService, search_filter_service_1.SearchAndFilterService],
            directives: [comicvine_grid_component_1.ComicvineCharGrid, search_component_1.SearchComponent, go_back_up_component_1.GoBackUpComponent],
            template: "\n\n    <search-component [isActive]=\"isActive\" class=\"search-view-container\"\n    (searchEvent)=\"onSearchChanged($event)\" [(value)]=\"searchTerm\"></search-component>\n    <comicvine-grid [loadMoreChar]=\"loadMoreChar\" [characters]=\"characters\" (onBottomOfPage)=\"onBottomOfPage($event)\"></comicvine-grid>\n    <go-back-up></go-back-up>\n  "
        }), 
        __metadata('design:paramtypes', [comicvine_service_1.ComicvineCharactersService])
    ], ComicvineCharPage);
    return ComicvineCharPage;
}());
exports.ComicvineCharPage = ComicvineCharPage;
