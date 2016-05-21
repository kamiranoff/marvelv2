import {Component} from "@angular/core";
import {Observable} from "rxjs/Rx"; //full api

import {SearchComponent} from "../../../modules/search/search.component";
import {GraphComponent} from "../../../modules/graph/graph.component";
import {Grid} from "../../../modules/grid/grid.component";
import {GoBackUpComponent} from "../../../modules/go-back-up/go-back-up.component";


import {SearchAndFilterService} from "../../../services/search-filter.service";


import {ComicvineCharPage} from "../comicvine-master/comicvine-characters-page.component";
import {ComicvineCharactersService} from "../../../services/comicvine/comicvine-character.service";
import {ComicvineAppearancesService} from "../../../services/comicvine/comicvine-appearance.service";

@Component({
  selector: 'ComicvinePageTopCow',
  providers: [ComicvineCharactersService,ComicvineAppearancesService,SearchAndFilterService],
  directives: [Grid, SearchComponent,GoBackUpComponent,GraphComponent],
  templateUrl:'marvel-app/pages/comicvine/comicvine-master/comicvine-characters-page.component.html'
})

export class ComicvineCharPageTopCow extends ComicvineCharPage{
  protected page = "comicvineChars";
  protected characterServiceUrl = '/api/comicvine/top-cow/characters';
  protected appearancesServiceUrl = 'api/comicvine/top-cow/appearances';


  constructor(private _comicvineCharacterService:ComicvineCharactersService,private _comicvineAppearancesService:ComicvineAppearancesService) {
      super(_comicvineCharacterService,_comicvineAppearancesService)

  }

}
