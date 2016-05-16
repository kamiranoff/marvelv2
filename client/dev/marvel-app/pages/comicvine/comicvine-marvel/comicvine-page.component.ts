import {Component,Input,EventEmitter} from "@angular/core";
import {Observable} from "rxjs/Rx"; //full api

import {SearchComponent} from "../../../modules/search/search.component";
import {GoBackUpComponent} from "../../../modules/go-back-up/go-back-up.component";
import {SearchAndFilterService} from "../../../services/search-filter.service";
import {ComicvineMarvelCharactersService} from "../../../services/comicvine/marvel/comicvine-marvel-service";
import {Grid} from "../../../modules/grid/grid.component";
import {ComicvineMarvelAppearancesService} from "../../../services/comicvine/marvel/comicvine-marvel-appearance.service";
import {GraphComponent} from "../../../modules/graph/graph.component";


@Component({
  selector: 'ComicvinePageMarvel',
  providers: [ComicvineMarvelCharactersService,ComicvineMarvelAppearancesService,SearchAndFilterService],
  directives: [Grid, SearchComponent,GoBackUpComponent,GraphComponent],
  template: `

    <search-component [isActive]="isActive" class="search-view-container"
    (searchEvent)="onSearchChanged($event)" value="{{searchTerm}}"  [(searchTerm)]="searchTerm"></search-component>
    <graph class="graph" [appearances]="appearances"[collectionLength]="collectionLength" (onHeroClicked)="onHeroCLickedFromGraph($event)"></graph>
    <grid [page]="page" [loadMoreElem]="loadMoreElem" [elems]="elems" (onBottomOfPage)="onBottomOfPage($event)"></grid>
    <go-back-up></go-back-up>
  `
})

export class ComicvineCharPageMarvel {
  private elems:Array<any> = [];
  private appearances:Array<any> = [];
  private collectionLength:number;
  private allCharactersLoaded;
  private errorMessage:string;
  private isActive:boolean;
  private lastName;
  private searchTerm = '';
  private isSearchedActivated = false;
  private loadMoreElem = true;
  private page = "comicvineChars";


  constructor(private _comicvineMarvelCharacterService:ComicvineMarvelCharactersService,private _comicvineMarvelAppearancesService:ComicvineMarvelAppearancesService) {
    this.getCharacters();
    this.getAppearances();
    this.loadMoreElem = true;


  }

  onHeroCLickedFromGraph(heroName){
    this.searchTerm = heroName;
  }

  getCharacters() {
    this._comicvineMarvelCharacterService.getCharactersFromMarvel()
      .subscribe(
        characters => {
          this.elems = characters;
          this.allCharactersLoaded = characters;
          this.lastName = characters[characters.length -1].character.name;
        },
        error => this.errorMessage = <any>error
      );

  }

  getMoreCharacters(lastName,qty){
    if(!this._comicvineMarvelCharacterService.getMoreCharactersFromMarvel(lastName,qty)){
      return;
    }
    this._comicvineMarvelCharacterService.getMoreCharactersFromMarvel(lastName,qty)
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

  getAppearances(){
    this._comicvineMarvelAppearancesService.getAppearancesFromMarvel()
      .subscribe(
        data => {
          this.collectionLength = data.length;
          this.appearances = [
            {
              key: "Characters'Appearances",
              values: data
            }
          ];

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
      .flatMap(searchTerm => this._comicvineMarvelCharacterService.searchCharactersByNameFromMarvel(searchTerm));

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

      if(typeof(this.lastName) !== 'undefined'){
        this.getMoreCharacters(this.lastName,100);
      }
    }
    if(typeof(this.lastName) !== 'undefined') {
      this.loadMoreElem = false;
    }


  }
}
