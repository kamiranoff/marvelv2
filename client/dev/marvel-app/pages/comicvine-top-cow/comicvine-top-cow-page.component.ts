import {Component,Input,EventEmitter} from "@angular/core";
import {Observable} from "rxjs/Rx"; //full api

import {SearchComponent} from "../../modules/search/search.component";


import {GoBackUpComponent} from "../../modules/go-back-up/go-back-up.component";
import {SearchAndFilterService} from "../../services/search-filter.service";
import {Grid} from "../../modules/grid/grid.component";
import {ComicvineTopCowCharactersService} from "../../services/comicvine-top-cow.service";

@Component({
  selector: 'ComicvinePageTopCow',
  providers: [ComicvineTopCowCharactersService,SearchAndFilterService],
  directives: [Grid, SearchComponent,GoBackUpComponent],
  template:`

    <search-component [isActive]="isActive" class="search-view-container"
    (searchEvent)="onSearchChanged($event)" [(value)]="searchTerm"></search-component>
    <grid [page]="page" [loadMoreElem]="loadMoreElem" [elems]="elems" (onBottomOfPage)="onBottomOfPage($event)"></grid>
    <go-back-up></go-back-up>
  `
})

export class ComicvineCharPageTopCow {
  private elems:Array<any> = [];

  private allCharactersLoaded;
  private errorMessage:string;
  private isActive:boolean;
  private lastName;
  private searchTerm = '';
  private isSearchedActivated = false;
  private loadMoreElem = true;
  private page = "comicvineChars";

  constructor(private _comicvineTopCowCharacterService:ComicvineTopCowCharactersService,_searchAndFilterService:SearchAndFilterService) {
    this.getCharacters();

    this.loadMoreElem = true;


  }

  getCharacters() {
    this._comicvineTopCowCharacterService.getCharactersFromTopCow()
      .subscribe(
        characters => {
          this.elems = characters;
          console.log(this.elems);
          this.allCharactersLoaded = characters;
          this.lastName = characters[characters.length -1].character.name;
        },
        error => this.errorMessage = <any>error
      );

  }

  getMoreCharacters(lastName,qty){
    if(!this._comicvineTopCowCharacterService.getMoreCharactersFromTopCow(lastName,qty)){
      return;
    }
    this._comicvineTopCowCharacterService.getMoreCharactersFromTopCow(lastName,qty)
      .subscribe(
        characters => {
          if(characters.length === 0){
            return;
          }
          this.elems = this.elems.concat(characters);
          this.allCharactersLoaded = this.elems;
          this.lastName = characters[characters.length -1].character.name;
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
      .flatMap(searchTerm => this._comicvineTopCowCharacterService.searchCharactersByNameFromTopCow(searchTerm));

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
      console.log(this.lastName);
      this.getMoreCharacters(this.lastName,100);
    }
    this.loadMoreElem = false;


  }
}
