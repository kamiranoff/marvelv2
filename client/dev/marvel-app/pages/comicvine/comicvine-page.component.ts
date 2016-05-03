import {Component,Input,EventEmitter} from "angular2/core";
import {Observable} from "rxjs/Rx"; //full api

import {SearchComponent} from "../../modules/search/search.component";


import {GoBackUpComponent} from "../../modules/go-back-up/go-back-up.component";
import {ComicvineCharactersService} from "../../services/comicvine-service";
import {ComicvineCharGrid} from "../../modules/comicvine-grid/comicvine-grid.component";
import {SearchAndFilterService} from "../../services/search-filter.service";

@Component({
  selector: 'ComicvinePage',
  providers: [ComicvineCharactersService,SearchAndFilterService],
  directives: [ComicvineCharGrid, SearchComponent,GoBackUpComponent],
  template: `

    <search-component [isActive]="isActive" class="search-view-container"
    (searchEvent)="onSearchChanged($event)" [(value)]="searchTerm"></search-component>
    <comicvine-grid [loadMoreChar]="loadMoreChar" [characters]="characters" (onBottomOfPage)="onBottomOfPage($event)"></comicvine-grid>
    <go-back-up></go-back-up>
  `
})

export class ComicvineCharPage {
  private characters:Array<any> = [];

  private allCharactersLoaded;
  private errorMessage:string;
  private isActive:boolean;
  private lastId;
  private searchTerm = '';
  private isSearchedActivated = false;
  private loadMoreChar = true;

  constructor(private _comicvineCharacterService:ComicvineCharactersService) {
    this.getCharacters();

    this.loadMoreChar = true;


  }

  getCharacters() {
    this._comicvineCharacterService.getCharacters()
      .subscribe(
        characters => {
          this.characters = characters;
          console.log(this.characters);
          this.allCharactersLoaded = characters;
          this.lastId = characters[characters.length -1]._id;
        },
        error => this.errorMessage = <any>error
      );

  }

  getMoreCharacters(lastId,qty){
    if(!this._comicvineCharacterService.getMoreCharacters(lastId,qty)){
      return;
    }
    this._comicvineCharacterService.getMoreCharacters(lastId,qty)
      .subscribe(
        characters => {
          if(characters.length === 0){
            return;
          }
          this.characters = this.characters.concat(characters);
          this.allCharactersLoaded = this.characters;
          this.lastId = characters[characters.length -1]._id;
          this.loadMoreChar = true;
        },
        error => this.errorMessage = <any>error
      );
  }


  onSearchChanged(searchInput) {
    this.searchTerm = searchInput;
    if (searchInput === '') {
      this.characters = this.allCharactersLoaded;
      this.isActive = false;
      this.isSearchedActivated = false;

      return;
    }
    this.isSearchedActivated = true;
    this.isActive = true;
    var keyups = Observable.of(searchInput)
      .filter(text => text.length >= 1)
      .debounceTime(300)
      .distinctUntilChanged()
      .flatMap(searchTerm => this._comicvineCharacterService.searchCharactersByName(searchTerm));

    keyups.subscribe(function(data:Array<any>){
      this.characters = data;
      this.isActive = false;
    });

  }

  onBottomOfPage($event){

    if(this.isSearchedActivated){
      return;
    }
    if(this.loadMoreChar){
      this.getMoreCharacters(this.lastId,100);
    }
    this.loadMoreChar = false;


  }
}
