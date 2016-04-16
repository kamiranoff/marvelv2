/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />

import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';

import {AppComponent} from './marvel-app/app.component';
import {ROUTER_PROVIDERS} from "angular2/router";

bootstrap(AppComponent, [ROUTER_PROVIDERS,HTTP_PROVIDERS]);
