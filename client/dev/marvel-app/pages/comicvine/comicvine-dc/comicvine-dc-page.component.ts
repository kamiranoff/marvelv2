import {Component,Input,EventEmitter} from "@angular/core";
import {Observable} from "rxjs/Rx"; //full api

import {SearchComponent} from "../../../modules/search/search.component";


import {GoBackUpComponent} from "../../../modules/go-back-up/go-back-up.component";
import {SearchAndFilterService} from "../../../services/search-filter.service";
import {Grid} from "../../../modules/grid/grid.component";

import {GraphComponent} from "../../../modules/graph/graph.component";
import {ComicvineCharPage} from "../comicvine-master/comicvine-characters-page.component";
import {ComicvineCharactersService} from "../../../services/comicvine/comicvine-character.service";
import {ComicvineAppearancesService} from "../../../services/comicvine/comicvine-appearance.service";

@Component({
  selector: 'ComicvinePageDC',
  providers: [ComicvineCharactersService,ComicvineAppearancesService,SearchAndFilterService],
  directives: [Grid, SearchComponent,GoBackUpComponent,GraphComponent],
  templateUrl:'marvel-app/pages/comicvine/comicvine-master/comicvine-characters-page.component.html'
})

export class ComicvineCharPageDC extends ComicvineCharPage{
  protected page = "comicvineChars";
  protected characterServiceUrl = '/api/comicvine/dc/characters';
  protected appearancesServiceUrl = 'api/comicvine/dc/appearances';

  constructor(_comicvineCharacterService:ComicvineCharactersService,_comicvineAppearancesService:ComicvineAppearancesService) {
    super(_comicvineCharacterService,_comicvineAppearancesService)
  }

}
