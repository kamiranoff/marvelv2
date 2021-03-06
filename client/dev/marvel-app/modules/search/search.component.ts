import {Component,Output,EventEmitter,Input} from "@angular/core";
import {Control} from "@angular/common";
import {SearchAndFilterService} from "../../services/search-filter.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'search-component',
  inputs: ['isActive'],
  template: `
   <form>
    <input id="search" class="search-box" type="text" placeholder="Search..." [(ngModel)]="searchTerm"  [ngFormControl]="searchTermControl">
    <span class="icon icon-iron-man loader-icon" [class.active]="isActive"></span>
    </form>
  `
})

export class SearchComponent {
  private searchTermControl;
  private isActive = false;
  @Input() private searchTerm:string ='';

  subscription:Subscription;

  @Output() private searchEvent = new EventEmitter();

  constructor() {
    this.searchTermControl = new Control();

    //this.subscription = _searchAndFilterService.searchChange$.subscribe(() => {
    //  this.searchTerm='';
    //})
  }

  ngOnInit() {
    this.searchTermControl.valueChanges
      .debounceTime(400)
      .map(str=>(<string>str).trim()).subscribe(x => {
      this.searchTerm = x;
    //  this._searchAndFilterService.resetFilter();
      this.searchEvent.emit(x);
    });
  }

}
