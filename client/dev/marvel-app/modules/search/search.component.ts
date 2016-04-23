import {Component,Output,EventEmitter} from "angular2/core";
import {ControlGroup,FormBuilder} from "angular2/common";

@Component({
  selector:'search-component',
  inputs:['isActive'],
  template:`
   <form [ngFormModel]="searchForm">
    <input ngControl="search" id="search" class="search-box" type="text" placeholder="Search...">
    <span class="icon icon-iron-man loader-icon" [class.active]="isActive"></span>
    </form>
  `
})

export class SearchComponent{
  searchForm:ControlGroup;
  private isActive = false;

  @Output() private searchTerm = new EventEmitter();
  constructor(fb:FormBuilder){
    this.searchForm = fb.group({
      search:[]
    });
    var search = this.searchForm.find('search');
    search.valueChanges.debounceTime(400)
      .map(str=>(<string>str).replace(' ','-')).subscribe(x => {
      this.searchTerm.emit(x);
    });
  }

}
