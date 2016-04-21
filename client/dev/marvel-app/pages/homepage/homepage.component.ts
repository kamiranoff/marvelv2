import {Component,Input,EventEmitter} from "angular2/core";
import {Observable} from "rxjs/Rx"; //full api

import {CharactersGrid} from "../../modules/characters-grid/characters-grid.component";
import {SearchComponent} from "../../modules/search/search.component";
import {CharactersService} from "../../services/characters.service";

@Component({
  selector:'homepage',
  providers:[CharactersService],
  directives:[CharactersGrid,SearchComponent],
  template:`

    <search-component class="search-view-container"
    (searchTerm)="onSearchChanged($event)"></search-component>
    <characters-grid></characters-grid>
  `
})

export class Homepage{
  constructor(private _characterService:CharactersService){

  }
  onSearchChanged(searchInput){
    var keyups = Observable.of(searchInput)
      .filter(text => text.length >= 3)
      .debounceTime(400)
      .distinctUntilChanged()
      .flatMap(searchTerm => this._characterService.searchCharactersByName(searchTerm));
    keyups.subscribe(data =>{console.log("data",data)});
  }
}
