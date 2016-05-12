// ng2-parallax
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
var Parallax = (function () {
    function Parallax(element) {
        var _this = this;
        this.name = 'parallaxDirective';
        // the following @Inputs are all part of the config object, which for
        // brevity's sake, you can do a bunch of operations in bulk by passing
        // in the config object; caveat for this is that angular 2 won't permit
        // more than 9 keys being passed in an object via the template
        this.cssKey = 'backgroundPosition';
        this.parallaxCss = 'backgroundPositionY';
        this.parallaxAxis = 'Y';
        this.parallaxRatio = -.7;
        this.parallaxInitVal = 0;
        this.parallaxIf = true;
        this.cssUnit = 'px';
        this.cb_context = null;
        this.cb_args = [];
        this.parallaxStyles = {};
        this.isSpecialVal = false;
        this.evaluateScroll = function () {
            if (_this.parallaxIf) {
                var resultVal = void 0;
                var calcVal = void 0;
                if (_this.scrollElement instanceof Window)
                    calcVal = _this.scrollElement.scrollY * _this.parallaxRatio + _this.parallaxInitVal;
                else
                    calcVal = _this.scrollElement.scrollTop * _this.parallaxRatio + _this.parallaxInitVal;
                if (_this.maxValue !== undefined && calcVal >= _this.maxValue)
                    calcVal = _this.maxValue;
                else if (_this.minValue !== undefined && calcVal <= _this.minValue)
                    calcVal = _this.minValue;
                // added after realizing original setup wasn't compatible in Firefox
                // debugger;
                if (_this.cssKey === 'backgroundPosition') {
                    if (_this.parallaxAxis === 'X') {
                        resultVal = calcVal + _this.cssUnit + ' 0';
                    }
                    else {
                        resultVal = '0 ' + calcVal + _this.cssUnit;
                    }
                }
                else if (_this.isSpecialVal) {
                    resultVal = _this.cssValue + '(' + calcVal + _this.cssUnit + ')';
                }
                else {
                    resultVal = calcVal + _this.cssUnit;
                }
                if (_this.cb) {
                    // console.log('this should be running')
                    _this.cb.apply(_this.cb_context, _this.cb_args);
                }
                _this.parallaxElement.style[_this.cssKey] = resultVal;
            }
        };
        this.hostElement = element.nativeElement;
    }
    Parallax.prototype.ngOnInit = function () {
        var cssValArray;
        // console.log('%s initialized on element', this.name, this.hostElement);
        // console.log(this);
        for (var prop in this.config) {
            this[prop] = this.config[prop];
        }
        this.parallaxCss = this.parallaxCss ? this.parallaxCss : 'backgroundPositionY';
        if (this.parallaxCss.match(/backgroundPosition/i)) {
            if (this.parallaxCss.split('backgroundPosition')[1].toUpperCase() === 'X') {
                this.parallaxAxis = 'X';
            }
            this.parallaxCss = 'backgroundPosition';
        }
        cssValArray = this.parallaxCss.split(':');
        this.cssKey = cssValArray[0];
        this.cssValue = cssValArray[1];
        this.isSpecialVal = this.cssValue ? true : false;
        if (!this.cssValue)
            this.cssValue = this.cssKey;
        this.parallaxRatio = +this.parallaxRatio;
        this.parallaxInitVal = +this.parallaxInitVal;
        this.parallaxElement = this.parallaxElement || this.hostElement;
        if (!this.scrollElement) {
            if (document.getElementById('parallaxScroll'))
                this.scrollElement = document.getElementById('parallaxScroll');
            else if (this.scrollerId) {
                try {
                    this.scrollElement = document.getElementById(this.scrollerId);
                    if (!this.scrollElement)
                        throw ("The ID passed through the parallaxConfig ('" + this.scrollerId + "') object was not found in the document.  Defaulting to tracking the scrolling of the window.");
                }
                catch (e) {
                    console.warn(e);
                    this.scrollElement = window;
                }
            }
            else
                this.scrollElement = window;
        }
        this.evaluateScroll();
        this.scrollElement.addEventListener('scroll', this.evaluateScroll.bind(this));
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Parallax.prototype, "config", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Parallax.prototype, "cssKey", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Parallax.prototype, "parallaxCss", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Parallax.prototype, "parallaxAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Parallax.prototype, "parallaxRatio", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Parallax.prototype, "parallaxInitVal", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Parallax.prototype, "parallaxIf", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Parallax.prototype, "scrollerId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Parallax.prototype, "maxValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Parallax.prototype, "minValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Parallax.prototype, "cssUnit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Parallax.prototype, "cb", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Parallax.prototype, "cb_context", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Parallax.prototype, "cb_args", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Parallax.prototype, "scrollElement", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', HTMLElement)
    ], Parallax.prototype, "parallaxElement", void 0);
    Parallax = __decorate([
        core_1.Directive({
            selector: '[parallax]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Parallax);
    return Parallax;
}());
exports.Parallax = Parallax;
