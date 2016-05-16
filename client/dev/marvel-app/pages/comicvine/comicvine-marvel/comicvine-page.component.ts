import {Component} from "@angular/core";

import {SearchAndFilterService} from "../../../services/search-filter.service";

import {ComicvineCharPage} from "../comicvine-master/comicvine-characters-page.component";
import {SearchComponent} from "../../../modules/search/search.component";
import {Grid} from "../../../modules/grid/grid.component";
import {GoBackUpComponent} from "../../../modules/go-back-up/go-back-up.component";
import {GraphComponent} from "../../../modules/graph/graph.component";
import {ComicvineCharactersService} from "../../../services/comicvine/comicvine-character.service";
import {ComicvineAppearancesService} from "../../../services/comicvine/comicvine-appearance.service";


@Component({
  selector: 'ComicvinePageMarvel',
  providers: [ComicvineCharactersService,ComicvineAppearancesService,SearchAndFilterService],
  directives: [Grid,SearchComponent,GoBackUpComponent,GraphComponent],
  templateUrl:'marvel-app/pages/comicvine/comicvine-master/comicvine-characters-page.component.html'
})

export class ComicvineCharPageMarvel extends ComicvineCharPage{
  protected page = "comicvineChars";
  protected characterServiceUrl = '/api/comicvine/marvel/characters';
  protected appearancesServiceUrl = 'api/comicvine/marvel/appearances';

  constructor(_comicvineCharacterService:ComicvineCharactersService,_comicvineAppearancesService:ComicvineAppearancesService) {
    super(_comicvineCharacterService,_comicvineAppearancesService)
  }

}
