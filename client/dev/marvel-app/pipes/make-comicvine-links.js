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
var core_1 = require('@angular/core');
var MakeComicvineLinksPipe = (function () {
    function MakeComicvineLinksPipe() {
    }
    MakeComicvineLinksPipe.prototype.transform = function (text) {
        if (!text)
            return '';
        // replace [[X]] links
        function replacer(match, p1, p2, p3, offset, string) {
            console.log(match);
            if (match.indexOf('src=') > -1) {
                return match;
            }
            var value = match.match(/>(.*?)</)[1];
            console.log("value", value);
            var id = p1.match(/data-ref-id="(.*?)"/);
            if (id) {
                id = id[1];
            }
            else {
                id = p1.match(/href="(.*?)"/)[1];
            }
            id = id.substr(id.lastIndexOf("-") + 1).replace(/\/$/, '');
            console.log("id", id);
            if (id === 'null') {
                return;
            }
            return '<a href="/comicvine-characters/' + id + '">' + value + ' </a>';
        }
        return text.replace(/<a(.*?)a>/igm, replacer);
        //return text;
    };
    MakeComicvineLinksPipe = __decorate([
        core_1.Pipe({
            name: 'makeComicvineLinks'
        }), 
        __metadata('design:paramtypes', [])
    ], MakeComicvineLinksPipe);
    return MakeComicvineLinksPipe;
}());
exports.MakeComicvineLinksPipe = MakeComicvineLinksPipe;
