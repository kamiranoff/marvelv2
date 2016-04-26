import {Injectable} from 'angular2/core'
import {Subject}    from 'rxjs/Subject';

@Injectable()

export class SearchAndFilterService{
  private _searchTermSource = new Subject<string>();
  private  _filterSource = new Subject<string[]>();

  searchChange$ = this._searchTermSource.asObservable();
  filterChanged$ = this._filterSource.asObservable();



  resetSearch(){
    console.log('reseting search');
    this._searchTermSource.next('');

  }

  resetFilter(){
    this._filterSource.next([]);
  }

}
