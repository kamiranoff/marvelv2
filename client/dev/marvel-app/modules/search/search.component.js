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
var SearchComponent = (function () {
    function SearchComponent(fb) {
        var _this = this;
        this.searchTerm = new core_1.EventEmitter();
        this.searchForm = fb.group({
            search: []
        });
        var search = this.searchForm.find('search');
        search.valueChanges.debounceTime(400)
            .map(function (str) { return str.replace(' ', '-'); }).subscribe(function (x) {
            console.log(x);
            console.log(_this.searchTerm);
            _this.searchTerm.emit(x);
        });
    }
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SearchComponent.prototype, "searchTerm", void 0);
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'search-component',
            template: "\n   <form [ngFormModel]=\"searchForm\">\n    <input ngControl=\"search\" id=\"search\" class=\"search-box\" type=\"text\" placeholder=\"Search...\">\n    <span class=\"flaticon flaticon-iron-man loader-icon\"></span>\n    </form>\n  "
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
