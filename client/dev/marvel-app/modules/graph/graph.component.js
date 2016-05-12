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
    }
    GraphComponent.prototype.ngOnInit = function () {
        this.options = {
            chart: {
                type: 'multiBarHorizontalChart',
                height: 300,
                width: 105000,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 55
                },
                x: function (d) {
                    return d.character.name;
                },
                y: function (d) { return d.character.count_of_issue_appearances; },
                showValues: true,
                valueFormat: function (d) {
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
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GraphComponent.prototype, "appearances", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], GraphComponent.prototype, "collectionLength", void 0);
    GraphComponent = __decorate([
        core_1.Component({
            selector: 'graph',
            directives: [ng2_nvd3_1.nvD3],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div class=\"graph-container\" [style.width]=\"'105000px'\">\n      <nvd3 [options]=\"options\" [data]=\"appearances\"></nvd3>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], GraphComponent);
    return GraphComponent;
}());
exports.GraphComponent = GraphComponent;
