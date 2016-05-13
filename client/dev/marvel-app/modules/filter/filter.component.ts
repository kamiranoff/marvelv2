import {Component,Input,Output,EventEmitter} from "@angular/core";
import {ReplacePipe} from "../../pipes/replace.pipe";
import {SearchAndFilterService} from "../../services/search-filter.service";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector:'filter',
  inputs:['categories'],
  pipes:[ReplacePipe],
  templateUrl:"marvel-app/modules/filter/filter.component.html"

})

export class FilterComponent{
  private categories = [];
  private filter:Array<any> = [];
  private isVisible = false;
  private subscription:Subscription;

  constructor(private _searchAndFilterService:SearchAndFilterService){
    this.subscription = _searchAndFilterService.filterChanged$.subscribe(() =>{
      this.filter = [];

      for(var i = 0;i< this.categories.length;i++){
        this.categories[i].selected = false;
      }
      this.isVisible = false;
    })
  };

  @Output() private onFilterChanged:EventEmitter<any> = new EventEmitter();

  toggleFilter(){
    this.isVisible = !this.isVisible;
  };

  onFilterClicked(category){
    var categoryName = category.name;
    var indexOfCategory = this.filter.indexOf(categoryName);

    if( indexOfCategory !== -1){
      this.filter.splice(indexOfCategory,1);
      category.selected=false;
    }else{
      this.filter.push(categoryName);
      category.selected=true;
    }

    this._searchAndFilterService.resetSearch();
    this.onFilterChanged.emit(this.filter);

  }

}
