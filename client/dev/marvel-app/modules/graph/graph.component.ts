import {Component,OnInit,Input,ChangeDetectionStrategy,ChangeDetectorRef,Output,EventEmitter} from '@angular/core'
import {nvD3} from 'ng2-nvd3'
declare let d3: any;

@Component({
  selector:'graph',
  directives: [nvD3],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
    <div class="graph-container" [style.width]="'15000px'">
    <h2>Characters by Appearances</h2>
      <nvd3 [options]="options" [data]="appearances"></nvd3>
    </div>
  `
})


export class GraphComponent{
  private characterName:string;
  options;
  data;

  @Input() appearances = [];
  @Input() collectionLength:number;
  @Output() private onHeroClicked:EventEmitter<any> = new EventEmitter();



  constructor(){}




  colorFunction = function() {
    return function(d,i) {
      var opacity = i / 1000;
      if(opacity <= 0.2){
        opacity = 1;
      }
      var rgba = "rgba(50,100,150,"+opacity+")";
      return rgba;
    }
  };


  ngOnInit(){
    var self = this;
    this.options = {
      chart: {
        type: 'discreteBarChart',
        height: 300,
        width:15000,
        margin : {
          top: 30,
          right: 30,
          bottom: 100,
          left: 30
        },
        color:this.colorFunction(),
        x: function(d){
          return d.character.name;
        },
        y: function(d){
          return d.character.count_of_issue_appearances;
        },
        showValues: true,
        valueFormat: function(d){
          return d3.format('')(d);
        },
        duration: 500,
        xAxis: {
          rotateLabels: -45,
          tickFormat: function(d) {
            return (d);

          },
        },

        tooltip: {
          contentGenerator: function (e) {
            var series = e.series[0];
            if (series.value === null) return;

            var rows =

              "<span class='key'>" + 'Issues: ' + "</span>" +
              "<span class='x-value'><strong> " + series.value + "</strong></span>"

            var header = "<h3>" + series.key + "</h3>";
            return "<div>" +
              header +
              rows +
              "</div>";
          }
        },
        staggerLabels:false,
        showYAxis:false,
        discretebar:{
          dispatch: {
            elementClick: function (e) {
              self.characterName = e.data.character.name;
              self.onHeroClicked.emit(self.characterName);
            }
          }
        }
      }
    };
  }
}
