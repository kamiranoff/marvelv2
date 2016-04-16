"use strict";
var CharactersService = (function () {
    function CharactersService() {
    }
    CharactersService.prototype.getCharacters = function () {
        return [{
                id: 1,
                name: 'Shakira',
            }, {
                id: 2,
                name: 'Psylocke'
            }];
    };
    return CharactersService;
}());
exports.CharactersService = CharactersService;
