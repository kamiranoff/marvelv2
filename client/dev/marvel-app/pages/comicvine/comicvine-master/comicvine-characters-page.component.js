"use strict";
var Rx_1 = require("rxjs/Rx"); //full api
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
    return ComicvineCharPage;
}());
exports.ComicvineCharPage = ComicvineCharPage;
