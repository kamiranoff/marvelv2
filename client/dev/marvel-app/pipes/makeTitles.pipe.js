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
var core_1 = require('angular2/core');
var MakeTitlesPipe = (function () {
    function MakeTitlesPipe() {
    }
    MakeTitlesPipe.prototype.transform = function (text) {
        if (!text)
            return '';
        // replace [[X]] links
        function replacer(match, p1, p2, p3, offset, string) {
            return '<h2>' + p1 + '</h2>';
        }
        text = text.replace(/\=\=\=([^\=\=\=]+)\=\=\=/igm, replacer);
        text = text.replace(/\=\=([^\=]+)\=\=/igm, replacer);
        return text;
    };
    MakeTitlesPipe = __decorate([
        core_1.Pipe({
            name: 'makeTitles'
        }), 
        __metadata('design:paramtypes', [])
    ], MakeTitlesPipe);
    return MakeTitlesPipe;
}());
exports.MakeTitlesPipe = MakeTitlesPipe;
