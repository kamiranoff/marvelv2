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
  @Input() private selectedCategories:Array<any> = [];
  private isVisible = false;
  private subscription:Subscription;

  constructor(){};

  ngOnChanges() {
    if(this.selectedCategories.length === 0){
      this.isVisible = false;
    }

  }

  @Output() private onFilterChanged:EventEmitter<any> = new EventEmitter();

  toggleFilter(){
    this.isVisible = !this.isVisible;
  };

  onFilterClicked(category){
    var categoryName = category.name;
    var indexOfCategory = this.selectedCategories.indexOf(categoryName);
    //this._searchAndFilterService.resetSearch();

    if( indexOfCategory !== -1){
      this.selectedCategories.splice(indexOfCategory,1);
      category.selected=false;
    }else{
      this.selectedCategories.push(categoryName);
      category.selected=true;
    }


    this.onFilterChanged.emit(this.selectedCategories);

  }

}
