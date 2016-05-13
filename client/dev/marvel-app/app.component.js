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
var router_deprecated_1 = require('@angular/router-deprecated');
var homepage_component_1 = require("./pages/homepage/homepage.component");
var header_component_1 = require("./modules/header/header.component");
var character_detail_component_1 = require("./pages/marvel/character-detail/character-detail.component");
var comics_page_component_1 = require("./pages/marvel/comics-page/comics-page.component");
var comicvine_page_component_1 = require("./pages/comicvine/comicvine-marvel/comicvine-page.component");
var comicvine_character_detail_component_1 = require("./pages/comicvine/comicvine-character-detail/comicvine-character-detail.component");
var navbar_component_1 = require("./modules/navbar/navbar.component");
var comicvine_dc_page_component_1 = require("./pages/comicvine/comicvine-dc/comicvine-dc-page.component");
var comicvine_top_cow_page_component_1 = require("./pages/comicvine/comicvine-top-cow/comicvine-top-cow-page.component");
var AppComponent = (function () {
    function AppComponent(router) {
        this.router = router;
    }
    AppComponent = __decorate([
        router_deprecated_1.RouteConfig([
            {
                path: '/',
                name: 'Homepage',
                component: homepage_component_1.Homepage,
                useAsDefault: true
            },
            {
                path: '/comicvine-marvel',
                name: 'ComicvineCharsMarvel',
                component: comicvine_page_component_1.ComicvineCharPageMarvel
            },
            {
                path: '/comicvine-dc',
                name: 'ComicvineCharsDC',
                component: comicvine_dc_page_component_1.ComicvineCharPageDC
            },
            {
                path: '/comicvine-top-cow',
                name: 'ComicvineCharsTopCow',
                component: comicvine_top_cow_page_component_1.ComicvineCharPageTopCow
            },
            {
                path: '/comicvine-characters/:id',
                name: 'ComicvineCharacterDetail',
                component: comicvine_character_detail_component_1.ComicvineCharacterDetail
            },
            {
                path: '/comics',
                name: 'ComicsPage',
                component: comics_page_component_1.ComicsPage
            },
            {
                path: '/characters/:id',
                name: 'CharacterDetail',
                component: character_detail_component_1.CharacterDetail
            }
        ]),
        core_1.Component({
            selector: 'my-app',
            directives: [navbar_component_1.NavbarComponent, header_component_1.HeaderComponent, router_deprecated_1.ROUTER_DIRECTIVES],
            styleUrls: ['app/app.component.css'],
            template: "\n  <navbar></navbar>\n  <header-component [class.small-header]=\"!router.isRouteActive(router.generate(['/Homepage']))\">\"></header-component>\n  <router-outlet></router-outlet>\n  "
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
