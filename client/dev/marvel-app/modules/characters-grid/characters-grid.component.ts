import {Component} from "angular2/core";
import {CharactersService} from "../../services/characters.service";


@Component({
  selector:'characters-grid',
  providers:[CharactersService],
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
