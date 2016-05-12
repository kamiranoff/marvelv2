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
var categories_service_1 = require("../../services/categories-service");
var replace_pipe_1 = require("../../pipes/replace.pipe");
var search_filter_service_1 = require("../../services/search-filter.service");
var FilterComponent = (function () {
    function FilterComponent(_categoriesService, _searchAndFilterService) {
        var _this = this;
        this._categoriesService = _categoriesService;
        this._searchAndFilterService = _searchAndFilterService;
        this.categories = [];
        this.filter = [];
        this.isVisible = false;
        this.onFilterChanged = new core_1.EventEmitter();
        this.subscription = _searchAndFilterService.filterChanged$.subscribe(function () {
            _this.filter = [];
            for (var i = 0; i < _this.categories.length; i++) {
                _this.categories[i].selected = false;
            }
            _this.isVisible = false;
        });
    }
    ;
    FilterComponent.prototype.toggleFilter = function () {
        this.isVisible = !this.isVisible;
    };
    ;
    FilterComponent.prototype.onFilterClicked = function (category) {
        var categoryName = category.name;
        var indexOfCategory = this.filter.indexOf(categoryName);
        if (indexOfCategory !== -1) {
            this.filter.splice(indexOfCategory, 1);
            category.selected = false;
        }
        else {
            this.filter.push(categoryName);
            category.selected = true;
        }
        this._searchAndFilterService.resetSearch();
        this.onFilterChanged.emit(this.filter);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FilterComponent.prototype, "onFilterChanged", void 0);
    FilterComponent = __decorate([
        core_1.Component({
            selector: 'filter',
            inputs: ['categories'],
            pipes: [replace_pipe_1.ReplacePipe],
            providers: [categories_service_1.CategoriesService],
            templateUrl: "marvel-app/modules/filter/filter.component.html"
        }), 
        __metadata('design:paramtypes', [categories_service_1.CategoriesService, search_filter_service_1.SearchAndFilterService])
    ], FilterComponent);
    return FilterComponent;
}());
exports.FilterComponent = FilterComponent;
