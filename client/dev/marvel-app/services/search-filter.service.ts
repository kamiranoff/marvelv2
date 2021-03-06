import {Injectable} from '@angular/core'
import {Subject}    from 'rxjs/Subject';

@Injectable()
export class SearchAndFilterService{
  private _searchTermSource = new Subject<string>();
  private  _filterSource = new Subject<string[]>();

  searchChange$ = this._searchTermSource.asObservable();
  filterChanged$ = this._filterSource.asObservable();

  resetSearch(){
    this._searchTermSource.next('');

  }
  resetFilter(){
    this._filterSource.next([]);
  }

}
