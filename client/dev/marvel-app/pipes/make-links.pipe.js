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
var MakeLinksPipe = (function () {
    function MakeLinksPipe() {
    }
    MakeLinksPipe.prototype.transform = function (text, field) {
        if (!text)
            return '';
        // strip out image links
        text = text.replace(/\[\[(image):([^\]]+)\]\]/igm, '');
        // strip out glossary links
        text = text.replace(/\[\[glossary:([^\]]+)\]\]/igm, function (match, p1, p2, p3, offset, string) {
            var splitParts = p1.split('|');
            if (splitParts.length > 1)
                return splitParts[1];
            return p1;
        });
        // limit the links to a field
        var fieldLink = (typeof field === 'string') ? '&amp;field=' + field : '';
        // replace [[X]] links
        function replacer(match, p1, p2, p3, offset, string) {
            var splitParts = p1.split('|');
            if (splitParts.length > 1) {
                return '<a href="/characters/search?s=' + encodeURIComponent(splitParts[0]) + fieldLink + '">' + splitParts[1] + '</a>';
            }
            return '<a href="/characters/search?s=' + encodeURIComponent(p1) + fieldLink + '">' + p1 + '</a>';
        }
        // return text.replace(/\[\[([\w, \(\)\|\-:#,\.']+)\]\]/igm, replacer);
        return text.replace(/\[\[([^\]]+)\]\]/igm, replacer);
    };
    MakeLinksPipe = __decorate([
        core_1.Pipe({
            name: 'makeLinks'
        }), 
        __metadata('design:paramtypes', [])
    ], MakeLinksPipe);
    return MakeLinksPipe;
}());
exports.MakeLinksPipe = MakeLinksPipe;
