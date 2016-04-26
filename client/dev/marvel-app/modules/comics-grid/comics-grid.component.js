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
var get_average_rgb_helper_1 = require("../../helpers/get-average-rgb.helper");
var ComicsGrid = (function () {
    function ComicsGrid() {
        this.comics = [];
        this.onBottomOfPage = new core_1.EventEmitter();
    }
    ComicsGrid.prototype.onScroll = function () {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            this.onBottomOfPage.emit("on the bottom");
        }
    };
    ComicsGrid.prototype.changeTitleColorOnHover = function (idx, elm) {
        var img = elm.currentTarget.getElementsByTagName("img")[0];
        var imageColor = get_average_rgb_helper_1.GetAverageRgb.getAverageRGB(img);
        var rgbImageColor = "rgb(" + imageColor.r + "," + imageColor.g + "," + imageColor.b + ")";
        this.comics[idx].dominantColor = rgbImageColor;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ComicsGrid.prototype, "loadMoreComics", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ComicsGrid.prototype, "onBottomOfPage", void 0);
    ComicsGrid = __decorate([
        core_1.Component({
            selector: 'comics-grid',
            inputs: ['comics'],
            templateUrl: 'marvel-app/modules/comics-grid/comics-grid.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ComicsGrid);
    return ComicsGrid;
}());
exports.ComicsGrid = ComicsGrid;
