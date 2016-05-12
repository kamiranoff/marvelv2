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
var search_component_1 = require("../../modules/search/search.component");
var characters_service_1 = require("../../services/characters.service");
var filter_component_1 = require("../../modules/filter/filter.component");
var categories_service_1 = require("../../services/categories-service");
var go_back_up_component_1 = require("../../modules/go-back-up/go-back-up.component");
var search_filter_service_1 = require("../../services/search-filter.service");
var grid_component_1 = require("../../modules/grid/grid.component");
var Homepage = (function () {
    function Homepage(_characterService, _categoriesService, _searchAndFilterService) {
        this._characterService = _characterService;
        this._categoriesService = _categoriesService;
        this._searchAndFilterService = _searchAndFilterService;
        this.elems = [];
        this.categories = [];
        this.selectedCategories = [];
        this.searchTerm = '';
        this.isSearchedActivated = false;
        this.isFilterActivated = false;
        this.loadMoreElem = true;
        this.page = "marvelApi";
        this.getCharacters();
        this.getCategories();
        this.loadMoreElem = true;
    }
    Homepage.prototype.getCharacters = function () {
        var _this = this;
        this._characterService.getCharacters()
            .subscribe(function (characters) {
            _this.elems = characters;
            _this.allCharactersLoaded = characters;
            _this.lastId = characters[characters.length - 1]._id;
        }, function (error) { return _this.errorMessage = error; });
    };
    Homepage.prototype.getMoreCharacters = function (lastId, qty) {
        var _this = this;
        if (!this._characterService.getMoreCharacters(lastId, qty)) {
            return;
        }
        this._characterService.getMoreCharacters(lastId, qty)
            .subscribe(function (characters) {
            if (characters.length === 0) {
                return;
            }
            _this.elems = _this.elems.concat(characters);
            _this.allCharactersLoaded = _this.elems;
            _this.lastId = characters[characters.length - 1]._id;
            _this.loadMoreElem = true;
        }, function (error) { return _this.errorMessage = error; });
    };
    Homepage.prototype.getCategories = function () {
        var _this = this;
        this._categoriesService.getCategories()
            .subscribe(function (categories) {
            _this.categories = categories;
        }, function (error) { return _this.errorMessage = error; });
    };
    Homepage.prototype.onCategoryClicked = function (categories) {
        var _this = this;
        this.selectedCategories = categories;
        if (categories.length === 0) {
            this.isFilterActivated = false;
            this.elems = this.allCharactersLoaded;
        }
        else {
            this.isFilterActivated = true;
        }
        this.isActive = true;
        this._characterService.getCharcterByCategory(categories)
            .subscribe(function (characters) {
            _this.elems = characters;
            _this.isActive = false;
        }, function (error) { return _this.errorMessage = error; });
    };
    Homepage.prototype.onSearchChanged = function (searchInput) {
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
            .flatMap(function (searchTerm) { return _this._characterService.searchCharactersByName(searchTerm); });
        keyups.subscribe(function (data) {
            _this.elems = data;
            _this.isActive = false;
        });
    };
    Homepage.prototype.onBottomOfPage = function ($event) {
        this.loadMoreElem = false;
        if (this.isFilterActivated || this.isSearchedActivated) {
            return;
        }
        this.getMoreCharacters(this.lastId, 100);
    };
    Homepage = __decorate([
        core_1.Component({
            selector: 'homepage',
            providers: [characters_service_1.CharactersService, categories_service_1.CategoriesService, search_filter_service_1.SearchAndFilterService],
            directives: [grid_component_1.Grid, search_component_1.SearchComponent, filter_component_1.FilterComponent, go_back_up_component_1.GoBackUpComponent],
            template: "\n\n    <search-component [isActive]=\"isActive\" class=\"search-view-container\"\n    (searchEvent)=\"onSearchChanged($event)\" [(value)]=\"searchTerm\"></search-component>\n    <filter [categories]=\"categories\" (onFilterChanged)=\"onCategoryClicked($event)\"></filter>\n    <grid [page]=\"page\" [loadMoreElem]=\"loadMoreElem\" [elems]=\"elems\" (onBottomOfPage)=\"onBottomOfPage($event)\"></grid>\n    <go-back-up></go-back-up>\n  "
        }), 
        __metadata('design:paramtypes', [characters_service_1.CharactersService, categories_service_1.CategoriesService, search_filter_service_1.SearchAndFilterService])
    ], Homepage);
    return Homepage;
}());
exports.Homepage = Homepage;
