
import {Component} from '@angular/core';
import {RouteConfig,ROUTER_DIRECTIVES,Router} from '@angular/router-deprecated';


import {Homepage} from "./pages/homepage/homepage.component";
import {HeaderComponent} from "./modules/header/header.component";
import {CharacterDetail} from "./pages/marvel/character-detail/character-detail.component";
import {ComicsPage} from "./pages/marvel/comics-page/comics-page.component";
import {ComicvineCharPageMarvel} from "./pages/comicvine/comicvine-marvel/comicvine-page.component";
import {ComicvineCharacterDetail} from "./pages/comicvine/comicvine-character-detail/comicvine-character-detail.component";
import {NavbarComponent} from "./modules/navbar/navbar.component";
import {ComicvineCharPageDC} from "./pages/comicvine/comicvine-dc/comicvine-dc-page.component";
import {ComicvineCharPageTopCow} from "./pages/comicvine/comicvine-top-cow/comicvine-top-cow-page.component";


@RouteConfig([
  {
    path: '/',
    name: 'Homepage',
    component: Homepage,
    useAsDefault:true
  },
  {
    path: '/comicvine-marvel',
    name: 'ComicvineCharsMarvel',
    component: ComicvineCharPageMarvel
  },
  {
    path: '/comicvine-dc',
    name: 'ComicvineCharsDC',
    component: ComicvineCharPageDC
  },
  {
    path: '/comicvine-top-cow',
    name: 'ComicvineCharsTopCow',
    component: ComicvineCharPageTopCow
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
  directives:[NavbarComponent,HeaderComponent,ROUTER_DIRECTIVES],
  styleUrls: ['app/app.component.css'],
  template:`
  <navbar></navbar>
  <header-component [class.small-header]="!router.isRouteActive(router.generate(['/Homepage']))">"></header-component>
  <router-outlet></router-outlet>
  `

})

export class AppComponent {
  constructor(public router: Router) {
  }

}
