import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {CharactersService} from "../../services/characters.service";


@Component({
  selector:'characters-grid',
  providers:[CharactersService],
  directives:[ROUTER_DIRECTIVES],
  templateUrl:"marvel-app/modules/characters-grid/characters-grid.component.html"
})



export class CharactersGrid{
  private characters;
  private vibrantColor;


  constructor(chractersService:CharactersService) {
    this.characters = chractersService.getCharacters();
  }

  changeBgOnHover($event){
    console.log('hover',$event);
    this.vibrantColor="red";
  }
}
