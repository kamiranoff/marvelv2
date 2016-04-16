
import {Component} from 'angular2/core';
import {RouteConfig,ROUTER_DIRECTIVES} from 'angular2/router';

import {HeaderComponent} from "./modules/header/header.component";
import {CharactersGrid} from "./modules/characters-grid/characters-grid.component";

@RouteConfig([
  {
    path: '/',
    name: 'CharactersGrid',
    component: CharactersGrid,
    useAsDefault:true
  }

])

@Component({
  selector: 'my-app',
  directives:[HeaderComponent,ROUTER_DIRECTIVES],
  template:`
  <header-component></header-component>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['app/app.component.css'],

})

export class AppComponent {



}
