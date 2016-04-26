import {Component,Output,EventEmitter} from "angular2/core";
import {Control} from "angular2/common";
import {SearchAndFilterService} from "../../services/search-filter.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'search-component',
  inputs: ['isActive'],
  template: `
   <form>
    <input id="search" class="search-box" type="text" placeholder="Search..." [value]="searchTerm" [ngFormControl]="searchTermControl">
    <span class="icon icon-iron-man loader-icon" [class.active]="isActive"></span>
    </form>
  `
})

export class SearchComponent {
  private searchTermControl;
  private isActive = false;
  private searchTerm:string;

  subscription:Subscription;

  @Output() private searchEvent = new EventEmitter();

  constructor(private _searchAndFilterService:SearchAndFilterService) {
    this.searchTermControl = new Control();

    this.subscription = _searchAndFilterService.searchChange$.subscribe(() => {
      this.searchTerm='';
    })
  }

  ngOnInit() {
    this.searchTermControl.valueChanges
      .debounceTime(400)
      .map(str=>(<string>str).replace(' ', '-')).subscribe(x => {
      this.searchTerm = x;
      this._searchAndFilterService.resetFilter();
      this.searchEvent.emit(x);
    });
  }

}
