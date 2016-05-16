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
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx"); //full api
var search_component_1 = require("../../../modules/search/search.component");
var go_back_up_component_1 = require("../../../modules/go-back-up/go-back-up.component");
var search_filter_service_1 = require("../../../services/search-filter.service");
var comicvine_marvel_service_1 = require("../../../services/comicvine/marvel/comicvine-marvel-service");
var grid_component_1 = require("../../../modules/grid/grid.component");
var comicvine_marvel_appearance_service_1 = require("../../../services/comicvine/marvel/comicvine-marvel-appearance.service");
var graph_component_1 = require("../../../modules/graph/graph.component");
var ComicvineCharPageMarvel = (function () {
    function ComicvineCharPageMarvel(_comicvineMarvelCharacterService, _comicvineMarvelAppearancesService) {
        this._comicvineMarvelCharacterService = _comicvineMarvelCharacterService;
        this._comicvineMarvelAppearancesService = _comicvineMarvelAppearancesService;
        this.elems = [];
        this.appearances = [];
        this.searchTerm = '';
        this.isSearchedActivated = false;
        this.loadMoreElem = true;
        this.page = "comicvineChars";
        this.getCharacters();
        this.getAppearances();
        this.loadMoreElem = true;
    }
    ComicvineCharPageMarvel.prototype.onHeroCLickedFromGraph = function (heroName) {
        this.searchTerm = heroName;
    };
    ComicvineCharPageMarvel.prototype.getCharacters = function () {
        var _this = this;
        this._comicvineMarvelCharacterService.getCharactersFromMarvel()
            .subscribe(function (characters) {
            _this.elems = characters;
            _this.allCharactersLoaded = characters;
            _this.lastName = characters[characters.length - 1].character.name;
        }, function (error) { return _this.errorMessage = error; });
    };
    ComicvineCharPageMarvel.prototype.getMoreCharacters = function (lastName, qty) {
        var _this = this;
        if (!this._comicvineMarvelCharacterService.getMoreCharactersFromMarvel(lastName, qty)) {
            return;
        }
        this._comicvineMarvelCharacterService.getMoreCharactersFromMarvel(lastName, qty)
            .subscribe(function (characters) {
            if (characters.length === 0) {
                return;
            }
            _this.elems = _this.elems.concat(characters);
            _this.allCharactersLoaded = _this.elems;
            _this.lastName = characters[characters.length - 1].character.name;
            _this.loadMoreElem = true;
        }, function (error) { return _this.errorMessage = error; });
    };
    ComicvineCharPageMarvel.prototype.getAppearances = function () {
        var _this = this;
        this._comicvineMarvelAppearancesService.getAppearancesFromMarvel()
            .subscribe(function (data) {
            _this.collectionLength = data.length;
            _this.appearances = [
                {
                    key: "Characters'Appearances",
                    values: data
                }
            ];
        }, function (error) { return _this.errorMessage = error; });
    };
    ComicvineCharPageMarvel.prototype.onSearchChanged = function (searchInput) {
        var _this = this;
        this.searchTerm = searchInput;
        if (searchInput === '') {
            this.elems = this.allCharactersLoaded;
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
            .flatMap(function (searchTerm) { return _this._comicvineMarvelCharacterService.searchCharactersByNameFromMarvel(searchTerm); });
        keyups.subscribe(function (data) {
            _this.elems = data;
            _this.isActive = false;
        });
    };
    ComicvineCharPageMarvel.prototype.onBottomOfPage = function ($event) {
        if (this.isSearchedActivated) {
            return;
        }
        if (this.loadMoreElem) {
            if (typeof (this.lastName) !== 'undefined') {
                this.getMoreCharacters(this.lastName, 100);
            }
        }
        if (typeof (this.lastName) !== 'undefined') {
            this.loadMoreElem = false;
        }
    };
    ComicvineCharPageMarvel = __decorate([
        core_1.Component({
            selector: 'ComicvinePageMarvel',
            providers: [comicvine_marvel_service_1.ComicvineMarvelCharactersService, comicvine_marvel_appearance_service_1.ComicvineMarvelAppearancesService, search_filter_service_1.SearchAndFilterService],
            directives: [grid_component_1.Grid, search_component_1.SearchComponent, go_back_up_component_1.GoBackUpComponent, graph_component_1.GraphComponent],
            template: "\n\n    <search-component [isActive]=\"isActive\" class=\"search-view-container\"\n    (searchEvent)=\"onSearchChanged($event)\" value=\"{{searchTerm}}\"  [(searchTerm)]=\"searchTerm\"></search-component>\n    <graph class=\"graph\" [appearances]=\"appearances\"[collectionLength]=\"collectionLength\" (onHeroClicked)=\"onHeroCLickedFromGraph($event)\"></graph>\n    <grid [page]=\"page\" [loadMoreElem]=\"loadMoreElem\" [elems]=\"elems\" (onBottomOfPage)=\"onBottomOfPage($event)\"></grid>\n    <go-back-up></go-back-up>\n  "
        }), 
        __metadata('design:paramtypes', [comicvine_marvel_service_1.ComicvineMarvelCharactersService, comicvine_marvel_appearance_service_1.ComicvineMarvelAppearancesService])
    ], ComicvineCharPageMarvel);
    return ComicvineCharPageMarvel;
}());
exports.ComicvineCharPageMarvel = ComicvineCharPageMarvel;
