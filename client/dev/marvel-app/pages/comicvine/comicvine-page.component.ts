import {Component,Input,EventEmitter} from "angular2/core";
import {Observable} from "rxjs/Rx"; //full api

import {SearchComponent} from "../../modules/search/search.component";


import {GoBackUpComponent} from "../../modules/go-back-up/go-back-up.component";
import {ComicvineCharactersService} from "../../services/comicvine-service";
import {SearchAndFilterService} from "../../services/search-filter.service";
import {Grid} from "../../modules/grid/grid.component";

@Component({
  selector: 'ComicvinePage',
  providers: [ComicvineCharactersService,SearchAndFilterService],
  directives: [Grid, SearchComponent,GoBackUpComponent],
  template: `

    <search-component [isActive]="isActive" class="search-view-container"
    (searchEvent)="onSearchChanged($event)" [(value)]="searchTerm"></search-component>
    <grid [page]="page" [loadMoreElem]="loadMoreElem" [elems]="elems" (onBottomOfPage)="onBottomOfPage($event)"></grid>
    <go-back-up></go-back-up>
  `
})

export class ComicvineCharPage {
  private elems:Array<any> = [];

  private allCharactersLoaded;
  private errorMessage:string;
  private isActive:boolean;
  private lastId;
  private searchTerm = '';
  private isSearchedActivated = false;
  private loadMoreElem = true;
  private page = "comicvineChars";

  constructor(private _comicvineCharacterService:ComicvineCharactersService) {
    this.getCharacters();

    this.loadMoreElem = true;


  }

  getCharacters() {
    this._comicvineCharacterService.getCharacters()
      .subscribe(
        characters => {
          this.elems = characters;
          console.log(this.elems);
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
          this.elems = this.elems.concat(characters);
          this.allCharactersLoaded = this.elems;
          this.lastId = characters[characters.length -1]._id;
          this.loadMoreElem = true;
        },
        error => this.errorMessage = <any>error
      );
  }


  onSearchChanged(searchInput) {
    this.searchTerm = searchInput;
    if (searchInput === '') {
      this.elems = this.allCharactersLoaded;
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

    keyups.subscribe((data:Array<any>) => {
      this.elems = data;
      this.isActive = false;
    });

  }

  onBottomOfPage($event){

    if(this.isSearchedActivated){
      return;
    }
    if(this.loadMoreElem){
      this.getMoreCharacters(this.lastId,100);
    }
    this.loadMoreElem = false;


  }
}
