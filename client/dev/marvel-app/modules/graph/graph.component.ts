import {Component,OnInit,Input,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core'
import {nvD3} from 'ng2-nvd3'
declare let d3: any;

@Component({
  selector:'graph',
  directives: [nvD3],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
    <div class="graph-container" [style.width]="'105000px'">
      <nvd3 [options]="options" [data]="appearances"></nvd3>
    </div>
  `
})

export class GraphComponent{
  @Input() appearances = [];
  @Input() collectionLength:number;
  options;
  data;

  constructor(){}

  ngOnInit(){
    this.options = {
      chart: {
        type: 'multiBarHorizontalChart',
        height: 300,
        width:105000,
        margin : {
          top: 20,
          right: 20,
          bottom: 20,
          left: 55
        },
        x: function(d){
          return d.character.name;
        },
        y: function(d){return d.character.count_of_issue_appearances;},
        showValues: true,
        valueFormat: function(d){
          return d3.format('')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'X Axis'
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: -10
        }
      }
    };
  }
}
