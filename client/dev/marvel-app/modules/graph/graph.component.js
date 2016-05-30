"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ng2_nvd3_1 = require('ng2-nvd3');
var GraphComponent = (function () {
    function GraphComponent() {
        this.appearances = [];
        this.onHeroClicked = new core_1.EventEmitter();
        this.colorFunction = function () {
            return function (d, i) {
                var opacity = i / 1000;
                if (opacity <= 0.2) {
                    opacity = 1;
                }
                var rgba = "rgba(50,100,150," + opacity + ")";
                return rgba;
            };
        };
    }
    GraphComponent.prototype.ngOnInit = function () {
        var self = this;
        this.options = {
            chart: {
                type: 'discreteBarChart',
                height: 300,
                width: 100000,
                margin: {
                    top: 30,
                    right: 30,
                    bottom: 100,
                    left: 30
                },
                color: this.colorFunction(),
                x: function (d) {
                    return d.character.name;
                },
                y: function (d) {
                    return d.character.count_of_issue_appearances;
                },
                showValues: true,
                valueFormat: function (d) {
                    return d3.format('')(d);
                },
                duration: 500,
                xAxis: {
                    rotateLabels: -45,
                    tickFormat: function (d) {
                        return (d);
                    },
                },
                tooltip: {
                    contentGenerator: function (e) {
                        var series = e.series[0];
                        if (series.value === null)
                            return;
                        var rows = "<span class='key'>" + 'Issues: ' + "</span>" +
                            "<span class='x-value'><strong> " + series.value + "</strong></span>";
                        var header = "<h3>" + series.key + "</h3>";
                        return "<div>" +
                            header +
                            rows +
                            "</div>";
                    }
                },
                staggerLabels: false,
                showYAxis: false,
                discretebar: {
                    dispatch: {
                        elementClick: function (e) {
                            self.characterName = e.data.character.name;
                            self.onHeroClicked.emit(self.characterName);
                        }
                    }
                }
            }
        };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GraphComponent.prototype, "appearances", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], GraphComponent.prototype, "collectionLength", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], GraphComponent.prototype, "onHeroClicked", void 0);
    GraphComponent = __decorate([
        core_1.Component({
            selector: 'graph',
            directives: [ng2_nvd3_1.nvD3],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div class=\"graph-container\" [style.width]=\"'100000px'\">\n    <h2>Characters by Appearances</h2>\n      <nvd3 [options]=\"options\" [data]=\"appearances\"></nvd3>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], GraphComponent);
    return GraphComponent;
}());
exports.GraphComponent = GraphComponent;
