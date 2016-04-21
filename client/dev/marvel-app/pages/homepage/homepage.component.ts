import {Component,Input,EventEmitter} from "angular2/core";
import {Observable} from "rxjs/Rx"; //full api

import {CharactersGrid} from "../../modules/characters-grid/characters-grid.component";
import {SearchComponent} from "../../modules/search/search.component";
import {CharactersService} from "../../services/characters.service";
import {FilterComponent} from "../../modules/filter/filter.component";

@Component({
  selector: 'homepage',
  providers: [CharactersService],
  directives: [CharactersGrid, SearchComponent, FilterComponent],
  template: `

    <search-component [isActive]="isActive" class="search-view-container"
    (searchTerm)="onSearchChanged($event)"></search-component>
    <filter></filter>
    <characters-grid [characters]="characters"></characters-grid>
  `
})

export class Homepage {
  private characters = [];
  private allCharactersLoaded;
  private errorMessage:string;
  private isActive:Boolean;

  constructor(private _characterService:CharactersService) {
    this.getCharacters();
  }

  getCharacters() {
    this._characterService.getCharacters()
      .subscribe(
        characters => {
          this.characters = characters;
          this.allCharactersLoaded = characters;
        },
        error => this.errorMessage = <any>error
      );

  }

  onSearchChanged(searchInput) {
    if (searchInput === '') {
      this.characters = this.allCharactersLoaded;
      this.isActive = false;
      return;
    }

    this.isActive = true;
    var keyups = Observable.of(searchInput)
      .filter(text => text.length >= 1)
      .debounceTime(300)
      .distinctUntilChanged()
      .flatMap(searchTerm => this._characterService.searchCharactersByName(searchTerm));

    keyups.subscribe(data => {
      this.characters = data;
      this.isActive = false;
    });

  }
}
