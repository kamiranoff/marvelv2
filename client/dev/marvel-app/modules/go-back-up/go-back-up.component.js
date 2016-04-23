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
var GoBackUpComponent = (function () {
    function GoBackUpComponent() {
    }
    GoBackUpComponent.prototype.onClick = function () {
        var fullHeight = document.body.scrollTop;
        this.scrollToTop(fullHeight);
    };
    GoBackUpComponent.prototype.scrollToTop = function (heightWhenClicked) {
        var _this = this;
        if (document.body.scrollTop != 0 || document.documentElement.scrollTop != 0) {
            var x = (heightWhenClicked - document.body.scrollTop) / heightWhenClicked;
            window.scrollBy(0, -50);
            this.timeOut = setTimeout(function () {
                (_this.scrollToTop(heightWhenClicked));
            }, (Math.cos(Math.PI * x) + 1) / 2);
        }
        else {
            clearTimeout(this.timeOut);
        }
    };
    GoBackUpComponent = __decorate([
        core_1.Component({
            selector: 'go-back-up',
            template: "\n    <div (click)=\"onClick()\" class=\"go-back-up\">\n      <span class=\"icon icon-arrow-up\"></span>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], GoBackUpComponent);
    return GoBackUpComponent;
}());
exports.GoBackUpComponent = GoBackUpComponent;
