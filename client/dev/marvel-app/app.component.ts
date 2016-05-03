
import {Component} from 'angular2/core';
import {RouteConfig,ROUTER_DIRECTIVES,Router} from 'angular2/router';


import {Homepage} from "./pages/homepage/homepage.component";
import {HeaderComponent} from "./modules/header/header.component";
import {CharacterDetail} from "./modules/character-detail/character-detail.component";
import {ComicsPage} from "./pages/comics-page/comics-page.component";
import {ComicvineCharPage} from "./pages/comicvine/comicvine-page.component";
import {ComicvineCharacterDetail} from "./modules/comicvine-character-detail/comicvine-character-detail.component";

@RouteConfig([
  {
    path: '/',
    name: 'Homepage',
    component: Homepage,
    useAsDefault:true
  },
  {
    path: '/comicvine',
    name: 'ComicvineChars',
    component: ComicvineCharPage
  },
  {
    path: '/comicvine-characters/:id',
    name: 'ComicvineCharacterDetail',
    component: ComicvineCharacterDetail
  },
  {
    path: '/comics',
    name: 'ComicsPage',
    component: ComicsPage
  },
  {
    path: '/characters/:id',
    name: 'CharacterDetail',
    component: CharacterDetail
  }

])

@Component({
  selector: 'my-app',
  directives:[HeaderComponent,ROUTER_DIRECTIVES],
  template:`
  <header-component [class.small-header]="!router.isRouteActive(router.generate(['/Homepage']))">"></header-component>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['app/app.component.css'],

})

export class AppComponent {
  constructor(public router: Router) {

  }

}
