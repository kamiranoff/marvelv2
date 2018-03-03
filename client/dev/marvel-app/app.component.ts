import {Component} from '@angular/core';
import {RouteConfig,ROUTER_DIRECTIVES,Router} from '@angular/router-deprecated';

import {HeaderComponent} from "./modules/header/header.component";
import {CharacterDetail} from "./pages/marvel/character-detail/character-detail.component";
import {ComicsPage} from "./pages/marvel/comics-page/comics-page.component";
import {ComicvineCharPageMarvel} from "./pages/comicvine/comicvine-marvel/comicvine-page.component";
import {ComicvineCharacterDetail} from "./pages/comicvine/comicvine-character-detail/comicvine-character-detail.component";
import {NavbarComponent} from "./modules/navbar/navbar.component";
import {ComicvineCharPageDC} from "./pages/comicvine/comicvine-dc/comicvine-dc-page.component";
import {ComicvineCharPageTopCow} from "./pages/comicvine/comicvine-top-cow/comicvine-top-cow-page.component";
import {MemoryGame} from "./pages/memory-game/memory-game.component";
import {ComicvineStoryArcMarvelPage} from "./pages/comicvine/comicvine-arcs/marvel/comicvine-arc-marvel.component";

@RouteConfig([
  {
    path: '/',
    name: 'ComicvineCharsMarvel',
    component: ComicvineCharPageMarvel,
    useAsDefault:true
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
  },
  {
    path: '/memory-game',
    name: 'MemoryGame',
    component: MemoryGame
  },
  {
    path: '/story-arcs',
    name: 'StoryArcs',
    component: ComicvineStoryArcMarvelPage
  }
])

@Component({
  selector: 'my-app',
  directives:[ROUTER_DIRECTIVES,NavbarComponent,HeaderComponent],
  styleUrls: ['app/app.component.css'],
  template:`
  <navbar></navbar>
  <header-component [class.small-header]="!router.isRouteActive(router.generate(['/ComicvineCharsMarvel']))">"></header-component>
  <router-outlet></router-outlet>
  `
})

export class AppComponent {
  constructor(public router: Router) {
  }
}
