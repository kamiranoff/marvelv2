"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var search_component_1 = require("../../../modules/search/search.component");
var graph_component_1 = require("../../../modules/graph/graph.component");
var grid_component_1 = require("../../../modules/grid/grid.component");
var go_back_up_component_1 = require("../../../modules/go-back-up/go-back-up.component");
var search_filter_service_1 = require("../../../services/search-filter.service");
var comicvine_characters_page_component_1 = require("../comicvine-master/comicvine-characters-page.component");
var comicvine_character_service_1 = require("../../../services/comicvine/comicvine-character.service");
var comicvine_appearance_service_1 = require("../../../services/comicvine/comicvine-appearance.service");
var ComicvineCharPageTopCow = (function (_super) {
    __extends(ComicvineCharPageTopCow, _super);
    function ComicvineCharPageTopCow(_comicvineCharacterService, _comicvineAppearancesService) {
        _super.call(this, _comicvineCharacterService, _comicvineAppearancesService);
        this._comicvineCharacterService = _comicvineCharacterService;
        this._comicvineAppearancesService = _comicvineAppearancesService;
        this.page = "comicvineChars";
        this.characterServiceUrl = '/api/comicvine/dc/characters';
        this.appearancesServiceUrl = 'api/comicvine/dc/appearances';
    }
    ComicvineCharPageTopCow = __decorate([
        core_1.Component({
            selector: 'ComicvinePageTopCow',
            providers: [comicvine_character_service_1.ComicvineCharactersService, comicvine_appearance_service_1.ComicvineAppearancesService, search_filter_service_1.SearchAndFilterService],
            directives: [grid_component_1.Grid, search_component_1.SearchComponent, go_back_up_component_1.GoBackUpComponent, graph_component_1.GraphComponent],
            templateUrl: 'marvel-app/pages/comicvine/comicvine-master/comicvine-characters-page.component.html'
        }), 
        __metadata('design:paramtypes', [comicvine_character_service_1.ComicvineCharactersService, comicvine_appearance_service_1.ComicvineAppearancesService])
    ], ComicvineCharPageTopCow);
    return ComicvineCharPageTopCow;
}(comicvine_characters_page_component_1.ComicvineCharPage));
exports.ComicvineCharPageTopCow = ComicvineCharPageTopCow;
