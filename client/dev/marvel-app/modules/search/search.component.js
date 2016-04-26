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
var common_1 = require("angular2/common");
var search_filter_service_1 = require("../../services/search-filter.service");
var SearchComponent = (function () {
    function SearchComponent(_searchAndFilterService) {
        var _this = this;
        this._searchAndFilterService = _searchAndFilterService;
        this.isActive = false;
        this.searchEvent = new core_1.EventEmitter();
        this.searchTermControl = new common_1.Control();
        this.subscription = _searchAndFilterService.searchChange$.subscribe(function () {
            _this.searchTerm = '';
        });
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchTermControl.valueChanges
            .debounceTime(400)
            .map(function (str) { return str.replace(' ', '-'); }).subscribe(function (x) {
            _this.searchTerm = x;
            _this._searchAndFilterService.resetFilter();
            _this.searchEvent.emit(x);
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SearchComponent.prototype, "searchEvent", void 0);
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'search-component',
            inputs: ['isActive'],
            template: "\n   <form>\n    <input id=\"search\" class=\"search-box\" type=\"text\" placeholder=\"Search...\" [value]=\"searchTerm\" [ngFormControl]=\"searchTermControl\">\n    <span class=\"icon icon-iron-man loader-icon\" [class.active]=\"isActive\"></span>\n    </form>\n  "
        }), 
        __metadata('design:paramtypes', [search_filter_service_1.SearchAndFilterService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
