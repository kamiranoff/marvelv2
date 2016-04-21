import {Component,Output,EventEmitter} from "angular2/core";
import {ControlGroup,FormBuilder} from "angular2/common";

@Component({
  selector:'search-component',
  template:`
   <form [ngFormModel]="searchForm">
    <input ngControl="search" id="search" class="search-box" type="text" placeholder="Search...">
    <span class="flaticon flaticon-iron-man loader-icon"></span>
    </form>
  `
})

export class SearchComponent{
  searchForm:ControlGroup;

  @Output() private searchTerm = new EventEmitter();
  constructor(fb:FormBuilder){
    this.searchForm = fb.group({
      search:[]
    });
    var search = this.searchForm.find('search');
    search.valueChanges.debounceTime(400)
      .map(str=>(<string>str).replace(' ','-')).subscribe(x => {
      console.log(x);
      console.log(this.searchTerm);
      this.searchTerm.emit(x);
    });
  }

}
