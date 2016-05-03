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
var filter_component_1 = require("../../modules/filter/filter.component");
var go_back_up_component_1 = require("../../modules/go-back-up/go-back-up.component");
var search_filter_service_1 = require("../../services/search-filter.service");
var comics_grid_component_1 = require("../../modules/comics-grid/comics-grid.component");
var comics_service_1 = require("../../services/comics.service");
var ComicsPage = (function () {
    function ComicsPage(_comicsService, _searchAndFilterService) {
        this._comicsService = _comicsService;
        this._searchAndFilterService = _searchAndFilterService;
        this.comics = [];
        this.categories = [];
        this.selectedCategories = [];
        this.searchTerm = '';
        this.isSearchedActivated = false;
        this.isFilterActivated = false;
        this.loadMoreComics = true;
        this.limit = 100;
        this.getComics();
        this.loadMoreComics = true;
    }
    ComicsPage.prototype.getComics = function () {
        var _this = this;
        this._comicsService.getComics()
            .subscribe(function (comics) {
            _this.comics = comics;
            _this.allComicsLoaded = comics;
            _this.lastId = comics[comics.length - 1]._id;
            console.log(comics);
        }, function (error) { return _this.errorMessage = error; });
    };
    ComicsPage.prototype.getMoreComics = function (lastId, qty) {
        var _this = this;
        if (!this._comicsService.getMoreComics(lastId, qty)) {
            return;
        }
        this._comicsService.getMoreComics(lastId, qty)
            .subscribe(function (comics) {
            if (comics.length === 0) {
                return;
            }
            _this.comics = _this.comics.concat(comics);
            _this.allComicsLoaded = _this.comics;
            _this.lastId = comics[comics.length - 1]._id;
            _this.loadMoreComics = true;
        }, function (error) { return _this.errorMessage = error; });
    };
    ComicsPage.prototype.getMoreComicsFromSearch = function (searchTerm, lastId, qty) {
        var _this = this;
        if (!this._comicsService.getMoreComicsFromSearch(searchTerm, lastId, qty)) {
            return;
        }
        this._comicsService.getMoreComicsFromSearch(searchTerm, lastId, qty)
            .subscribe(function (comics) {
            if (comics.length === 0) {
                return;
            }
            _this.comics = _this.comics.concat(comics);
            _this.allComicsLoaded = _this.comics;
            _this.lastId = comics[comics.length - 1]._id;
            _this.loadMoreComics = false;
            if (comics.length === _this.limit) {
                _this.loadMoreComics = true;
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    //getCategories(){
    //  this._comicsService.getCategories()
    //    .subscribe(
    //      categories => {
    //        this.categories = categories;
    //      },
    //      error => this.errorMessage = <any>error
    //    );
    //}
    //onCategoryClicked(categories){
    //  this.selectedCategories = categories;
    //  if(categories.length === 0){
    //    this.isFilterActivated = false;
    //    this.comics  = this.allComicsLoaded;
    //  }else{
    //    this.isFilterActivated = true;
    //  }
    //  this.isActive = true;
    //  this._comicsService.getCharcterByCategory(categories)
    //    .subscribe(
    //     comics=> {
    //        this.comics= comics
    //        this.isActive=false;
    //      },
    //      error => this.errorMessage = <any>error
    //    );
    //
    //}
    ComicsPage.prototype.onSearchChanged = function (searchInput) {
        var _this = this;
        this.searchTerm = searchInput;
        if (searchInput === '') {
            this.comics = this.allComicsLoaded;
            this.isActive = false;
            this.isSearchedActivated = false;
            return;
        }
        this.loadMoreComics = false;
        this.isSearchedActivated = true;
        this.isActive = true;
        var keyups = Rx_1.Observable.of(searchInput)
            .filter(function (text) { return text.length >= 1; })
            .debounceTime(300)
            .distinctUntilChanged()
            .flatMap(function (searchTerm) { return _this._comicsService.searchComicsByTitle(searchTerm); });
        keyups.subscribe(function (data) {
            this.comics = data;
            this.lastId = data[data.length - 1]._id;
            this.isActive = false;
            this.loadMoreComics = false;
            if (data.length === this.limit) {
                this.loadMoreComics = true;
            }
        });
    };
    ComicsPage.prototype.onBottomOfPage = function ($event) {
        if (this.isFilterActivated) {
            return;
        }
        console.log("this.isSearchedActivated", this.isSearchedActivated);
        console.log("this.loadMoreComics", this.loadMoreComics);
        if (this.isSearchedActivated && this.loadMoreComics) {
            this.getMoreComicsFromSearch(this.searchTerm, this.lastId, this.limit);
            return;
        }
        else if (!this.isSearchedActivated) {
            this.getMoreComics(this.lastId, this.limit);
            this.loadMoreComics = false;
        }
    };
    ComicsPage = __decorate([
        core_1.Component({
            selector: 'comics-page',
            providers: [comics_service_1.ComicsService, search_filter_service_1.SearchAndFilterService],
            directives: [comics_grid_component_1.ComicsGrid, search_component_1.SearchComponent, filter_component_1.FilterComponent, go_back_up_component_1.GoBackUpComponent],
            template: "\n    <search-component [isActive]=\"isActive\" class=\"search-view-container\"\n    (searchEvent)=\"onSearchChanged($event)\" [(value)]=\"searchTerm\"></search-component>\n    <filter [categories]=\"categories\" (onFilterChanged)=\"onCategoryClicked($event)\"></filter>\n    <comics-grid [loadMoreComics]=\"loadMoreComics\" [comics]=\"comics\"  (onBottomOfPage)=\"onBottomOfPage($event)\"></comics-grid>\n    <go-back-up></go-back-up>\n  "
        }), 
        __metadata('design:paramtypes', [comics_service_1.ComicsService, search_filter_service_1.SearchAndFilterService])
    ], ComicsPage);
    return ComicsPage;
}());
exports.ComicsPage = ComicsPage;
