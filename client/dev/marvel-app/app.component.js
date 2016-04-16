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
var router_1 = require('angular2/router');
var header_component_1 = require("./modules/header/header.component");
var characters_grid_component_1 = require("./modules/characters-grid/characters-grid.component");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        router_1.RouteConfig([
            {
                path: '/',
                name: 'CharactersGrid',
                component: characters_grid_component_1.CharactersGrid,
                useAsDefault: true
            }
        ]),
        core_1.Component({
            selector: 'my-app',
            directives: [header_component_1.HeaderComponent, router_1.ROUTER_DIRECTIVES],
            template: "\n  <header-component></header-component>\n  <router-outlet></router-outlet>\n  ",
            styleUrls: ['app/app.component.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
