import {Component} from "angular2/core";
import {CharactersService} from "../../services/characters.service";
@Component({
  selector:'character-grid',
  templateUrl:"marvel-app/modules/characters-grid/characters-grid.component.html"
})


export class CharactersGrid{
  private characters;


  constructor(chractersService:CharactersService) {
    this.characters = chractersService.getCharacters();
  }
}
