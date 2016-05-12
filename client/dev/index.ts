import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';

import {AppComponent} from './marvel-app/app.component';
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
bootstrap(AppComponent, [HTTP_PROVIDERS,ROUTER_PROVIDERS]);
