/* Avoid: 'error TS2304: Cannot find name <type>' during compilation */
///<reference path="../../typings/globals/es6-shim/index.d.ts"/>
"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var app_component_1 = require('./marvel-app/app.component');
var router_deprecated_1 = require("@angular/router-deprecated");
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS, router_deprecated_1.ROUTER_PROVIDERS]);
