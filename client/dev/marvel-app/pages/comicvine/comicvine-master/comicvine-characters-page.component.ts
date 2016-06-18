import {Observable} from "rxjs/Rx"; //full api

export class ComicvineCharPage {
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
  protected page;
  protected characterServiceUrl;
  protected appearancesServiceUrl;


  constructor(private _charactersService,private _appearancesService) {
    this.loadMoreElem = true;
  }

  ngOnInit(){
    this.getCharacters(this.characterServiceUrl);
    this.getAppearances(this.appearancesServiceUrl);
  }

  onHeroCLickedFromGraph(heroName){
    this.searchTerm = heroName;
  }

  getCharacters(url) {
    this._charactersService.getCharacters(url)
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
    if(!this._charactersService.getMoreCharacters(this.characterServiceUrl,lastName,qty)){
      return;
    }
    this._charactersService.getMoreCharacters(this.characterServiceUrl,lastName,qty)
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

  getAppearances(url){
    this._appearancesService.getAppearances(url)
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
      .flatMap(searchTerm => this._charactersService.searchCharactersByName(this.characterServiceUrl,searchTerm));

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
