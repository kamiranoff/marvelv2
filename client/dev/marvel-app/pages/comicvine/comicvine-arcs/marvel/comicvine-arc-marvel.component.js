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
var core_1 = require("@angular/core");
var comicvine_character_service_1 = require("../../../../services/comicvine/comicvine-character.service");
var comicvine_appearance_service_1 = require("../../../../services/comicvine/comicvine-appearance.service");
var search_filter_service_1 = require("../../../../services/search-filter.service");
var search_component_1 = require("../../../../modules/search/search.component");
var go_back_up_component_1 = require("../../../../modules/go-back-up/go-back-up.component");
var graph_component_1 = require("../../../../modules/graph/graph.component");
var grid_component_1 = require("../../../../modules/grid/grid.component"); //full api
var ComicvineCharPage = (function () {
    function ComicvineCharPage(_charactersService, _appearancesService) {
        this._charactersService = _charactersService;
        this._appearancesService = _appearancesService;
        this.elems = [];
        this.appearances = [];
        this.searchTerm = '';
        this.isSearchedActivated = false;
        this.loadMoreElem = true;
        this.loadMoreElem = true;
    }
    ComicvineCharPage.prototype.ngOnInit = function () {
        this.getCharacters(this.characterServiceUrl);
        this.getAppearances(this.appearancesServiceUrl);
    };
    ComicvineCharPage.prototype.onHeroCLickedFromGraph = function (heroName) {
        this.searchTerm = heroName;
    };
    ComicvineCharPage.prototype.getCharacters = function (url) {
        var _this = this;
        console.log(url);
        this._charactersService.getCharacters(url)
            .subscribe(function (characters) {
            _this.elems = characters;
            _this.allCharactersLoaded = characters;
            _this.lastName = characters[characters.length - 1].character.name;
        }, function (error) { return _this.errorMessage = error; });
    };
    ComicvineCharPage.prototype.getMoreCharacters = function (lastName, qty) {
        var _this = this;
        if (!this._charactersService.getMoreCharacters(this.characterServiceUrl, lastName, qty)) {
            return;
        }
        this._charactersService.getMoreCharacters(this.characterServiceUrl, lastName, qty)
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
    ComicvineCharPage.prototype.getAppearances = function (url) {
        var _this = this;
        this._appearancesService.getAppearances(url)
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
    ComicvineCharPage.prototype.onSearchChanged = function (searchInput) {
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
            .flatMap(function (searchTerm) { return _this._charactersService.searchCharactersByName(_this.characterServiceUrl, searchTerm); });
        keyups.subscribe(function (data) {
            _this.elems = data;
            _this.isActive = false;
        });
    };
    ComicvineCharPage.prototype.onBottomOfPage = function ($event) {
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
    ComicvineCharPage = __decorate([
        //full api
        core_1.Component({
            selector: 'ComicvinePageMarvel',
            providers: [comicvine_character_service_1.ComicvineCharactersService, comicvine_appearance_service_1.ComicvineAppearancesService, search_filter_service_1.SearchAndFilterService],
            directives: [grid_component_1.Grid, search_component_1.SearchComponent, go_back_up_component_1.GoBackUpComponent, graph_component_1.GraphComponent],
            templateUrl: 'marvel-app/pages/comicvine/comicvine-arcs/comicvine-arc-marvel.html'
        }), 
        __metadata('design:paramtypes', [Object, Object])
    ], ComicvineCharPage);
    return ComicvineCharPage;
}());
exports.ComicvineCharPage = ComicvineCharPage;
